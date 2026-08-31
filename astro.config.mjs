// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// 数式用プラグインのインポート
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  server: {
    host: true,
  },
  integrations: [
    mdx({
      // MDX内で数式を変換するための設定
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  ],
});