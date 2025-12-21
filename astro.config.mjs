import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  // Markdown全般の設定（MDXにも適用される）
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [
    // MDX統合の設定ではプラグインを重複させない（あるいは markdown 設定を継承させる）
    mdx(),
  ],
});