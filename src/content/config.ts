import { defineCollection, z } from 'astro:content';

// 1. Projects コレクション (JSON形式)
const projectsCollection = defineCollection({
  type: 'data', // MarkdownではなくJSONデータとして扱う
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    summary: z.string(),
    thumbnail: z.string(),
    stack: z.array(z.string()),
    role: z.array(z.string()).optional(), // 必須でない項目は optional
    highlights: z.array(z.string()).optional(),
    results: z.array(z.string()).optional(),
    links: z.object({
      live: z.string().url().optional(),
      writeUp: z.string().optional(),
    }).optional(),
    // ソート順序制御用のフィールドを追加
    order: z.number().default(99), 
  }),
});

// 2. Skills コレクション
const skillsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    icon: z.string(),
    category: z.string(),
    order: z.number().default(99),
    count: z.number().optional(), // resumeと統合する場合に備えて
  }),
});

// 3. Resume コレクション (構造が複雑なので z.any() で一旦許容するか、厳密に定義するか)
// ここでは主要な部分だけ定義し、柔軟性を持たせます
const resumeCollection = defineCollection({
  type: 'data',
  schema: z.object({
    summary: z.string(),
    experience: z.array(z.object({
      company: z.string(),
      role: z.string(),
      period: z.string(),
      highlights: z.array(z.string()),
    })).optional(),
    // その他のフィールドは一旦パススルーさせる場合、
    // z.object(...).passthrough() を使うことも可能です
  }).passthrough(), 
});

const techNotesCollection = defineCollection({
  // まだMDファイルがない場合でも定義しておくと警告が消えます
  // 将来的に Markdown 記事を入れるなら type: 'content' ですが、
  // 今 JSON で管理しているなら 'data' にします。
  // 今回は「記事データ」として扱うため、一旦 'data' にしておきます。
  type: 'data', 
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    published: z.string().or(z.date()), // 日付文字列またはDate型
    summary: z.string(),
    tags: z.array(z.string()),
  }),
});

// コレクションをエクスポート
export const collections = {
  'projects': projectsCollection,
  'skills': skillsCollection,
  'resume': resumeCollection,
  'tech-notes': techNotesCollection,
};
