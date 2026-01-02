import { defineCollection, z } from 'astro:content';

const resumeCollection = defineCollection({
	type: 'data',
	schema: z.object({
		basics: z.object({
			name: z.string(),
			label: z.string(),
			summary: z.string(),
			url: z.string().optional(),
			location: z.object({
				city: z.string(),
				region: z.string(),
			}).optional(),
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
		keyProjects: z.array(z.any()).optional(),
		personalProjects: z.array(
			z.object({
				name: z.string(),
				summary: z.string(),
				
				// ★ここを追加 (.optional() を付けておくと安心です)
				architecture: z.string().optional(),
				
				details: z.array(z.string()),
				technologies: z.array(z.string()),
			})
		).optional(),
		interests: z.array(z.string()).optional(),
	}),
});

// Projects (MDX) 用のコレクション定義
const projectsCollection = defineCollection({
	type: 'content', // MDXは 'content'
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
