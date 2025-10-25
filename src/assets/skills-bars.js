import Chart from 'chart.js/auto';

const normalizeLabel = (label) =>
  label.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[\/_-]/g, ' ').trim();

const wrapLabel = (label, containerWidth) => {
  if (typeof label !== 'string') return label;
  const width = containerWidth ?? 320;
  const maxLength = Math.max(6, Math.floor(width / 18));
  const words = normalizeLabel(label).split(/\s+/u);
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    const tentative = currentLine ? `${currentLine} ${word}` : word;
    if (tentative.length > maxLength && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else if (tentative.length > maxLength) {
      const segments = word.match(new RegExp(`.{1,${maxLength}}`, 'gu')) ?? [word];
      if (segments.length > 1) {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = '';
        }
        lines.push(...segments.slice(0, -1));
        currentLine = segments.at(-1) ?? '';
      } else {
        currentLine = tentative;
      }
    } else {
      currentLine = tentative;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
};

const computeFontSize = (containerWidth) => {
  const width = containerWidth ?? 320;
  return Math.max(11, Math.min(16, Math.floor(width / 28)));
};

const computeLayoutPadding = (containerWidth) => {
  const width = containerWidth ?? 320;
  const left = Math.min(60, Math.max(14, Math.round(width / 18)));
  const right = Math.min(32, Math.max(12, Math.round(width / 24)));
  return {
    top: 16,
    bottom: 16,
    left,
    right
  };
};

const chartRegistry = new Map();

const getFontFamily = () => {
  const root = document.documentElement;
  return (
    getComputedStyle(root).getPropertyValue('--font-sans')?.trim() ||
    "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  );
};

const buildFontString = (size) => `${size}px ${getFontFamily()}`;

const valueLabelPlugin = {
  id: 'skillValueLabels',
  afterDatasetsDraw(chart) {
    const meta = chart.getDatasetMeta(0);
    if (!meta || !chart.data.labels) return;

    const { ctx, chartArea, width } = chart;
    const baseSize = computeFontSize(width);
    const font = buildFontString(baseSize);
    const lineHeight = baseSize + 4;
    const wrapWidth = Math.max(120, Math.floor(width * 0.32));

    ctx.save();
    ctx.fillStyle = '#f8fafc';
    ctx.textBaseline = 'middle';

    meta.data.forEach((element, index) => {
      const label = chart.data.labels?.[index];
      if (!label || !element) return;

      const lines = wrapLabel(String(label), wrapWidth);
      const availableRight = chartArea.right - 12;
      const xPosition = Math.min(availableRight, element.x + 12);
      ctx.textAlign = xPosition >= availableRight ? 'right' : 'left';
      ctx.font = `600 ${font}`;

      const totalHeight = (lines.length - 1) * lineHeight;
      lines.forEach((line, lineIndex) => {
        const y = element.y - totalHeight / 2 + lineIndex * lineHeight;
        ctx.fillText(line, xPosition, y);
      });
    });

    ctx.restore();
  }
};

const cleanupCharts = () => {
  chartRegistry.forEach(({ chart, observer, canvas }) => {
    observer.disconnect();
    chart.destroy();
    if (canvas?.dataset) {
      delete canvas.dataset.chartInitialized;
    }
  });
  chartRegistry.clear();
};

const initSkillBarCharts = () => {
  cleanupCharts();

  const dataElement = document.getElementById('skills-chart-data');
  if (!dataElement) {
    console.warn('Skill chart data element not found.');
    return;
  }

  let chartConfigs = [];
  try {
    chartConfigs = JSON.parse(dataElement.textContent ?? '[]');
  } catch (error) {
    console.error('Failed to parse skill chart data.', error);
    return;
  }

  chartConfigs.forEach((config) => {
    const canvas = document.getElementById(config.id);
    if (!(canvas instanceof HTMLCanvasElement)) return;
    if (!Array.isArray(config.labels) || !Array.isArray(config.data)) return;
    if (config.labels.length === 0 || config.data.length === 0) return;

    const chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: config.labels,
        datasets: [
          {
            label: 'Sessions',
            data: config.data,
            backgroundColor: 'rgba(56, 189, 248, 0.65)',
            borderRadius: 6,
            borderSkipped: false,
            maxBarThickness: 42
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: computeLayoutPadding(canvas.clientWidth)
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => context.label
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              color: 'rgba(148, 163, 184, 0.15)',
              drawBorder: false
            },
            ticks: {
              display: true,
              color: '#cbd5f5',
              padding: 6,
              callback: (value) => value
            }
          },
          y: {
            grid: {
              display: false
            },
            ticks: {
              display: false
            }
          }
        }
      },
      plugins: [valueLabelPlugin]
    });

    const applyResponsiveSizing = () => {
      const width = canvas.clientWidth || 320;
      chart.options.layout.padding = computeLayoutPadding(width);
      chart.options.scales.y.ticks.font = () => ({
        size: computeFontSize(width),
        weight: '600'
      });
      chart.update('none');
    };

    applyResponsiveSizing();

    const resizeObserver = new ResizeObserver(() => {
      applyResponsiveSizing();
    });

    const container = canvas.parentElement ?? canvas;
    resizeObserver.observe(container);
    canvas.dataset.chartInitialized = 'true';

    chartRegistry.set(canvas.id, { chart, observer: resizeObserver, canvas });
  });
};

const setup = () => {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initSkillBarCharts();
  } else {
    document.addEventListener('DOMContentLoaded', initSkillBarCharts, { once: true });
  }
};

document.addEventListener('astro:page-load', () => {
  initSkillBarCharts();
});

document.addEventListener('astro:before-swap', () => {
  cleanupCharts();
});

setup();
