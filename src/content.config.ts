import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

// resume.json はオブジェクト1件のファイルなので、
// file() ローダーが要求する「id をキーとするオブジェクト」の形に
// パース時点で包み直し、id "resume" の単一エントリとして読み込む
const resumeCollection = defineCollection({
	loader: file('./src/content/resume/resume.json', {
		parser: (text) => ({ resume: JSON.parse(text) }),
	}),
	schema: z.object({
		basics: z.object({
			summary: z.string(),
		}),
		education: z.array(
			z.object({
				institution: z.string(),
				area: z.string(),
				studyType: z.string(),
				period: z.string(),
				summary: z.string().optional(),

				links: z.array(
				z.object({
					label: z.string(),
					url: z.string(),
				})
				).optional(),
			})
		).optional(),
		work: z.array(
			z.object({
				company: z.string(),
				position: z.string(),
				period: z.string(),
				summary: z.string(),
			})
		).optional(),
		skills: z.array(
			z.object({
				category: z.string(),
				items: z.array(
					z.object({
						name: z.string(),
						count: z.number(),
					})
				),
			})
		).optional(),
	}),
});

// Projects (MDX) 用のコレクション定義
// アンダースコア始まりのファイル・ディレクトリ（下書き）は除外する
const projectsCollection = defineCollection({
	loader: glob({
		base: './src/content/projects',
		pattern: ['**/*.mdx', '!**/_*/**/*.mdx', '!**/_*.mdx'],
	}),
	schema: z.object({
		name: z.string(),
		summary: z.string(),
		architecture: z.string().optional(),
		technologies: z.array(z.string()).optional(),
		projectType: z.enum(['work', 'personal']).default('work'),
		order: z.number().default(99), // 並び順制御用
        
        // カードに表示するための要約ポイント（箇条書き）をフロントマターで管理する場合
        // MDXの本文とは別に、カード表示用に持たせておくと便利
        details: z.array(z.string()).optional(), 

		relatedLink: z.object({
			label: z.string(),
			url: z.string(),
		}).optional(),
	}),
});

export const collections = {
	resume: resumeCollection,
	projects: projectsCollection,
};
