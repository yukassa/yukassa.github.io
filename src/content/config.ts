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
		// keyProjects: z.array(
		// 	z.object({
		// 		name: z.string(),
		// 		summary: z.string(),
		// 		architecture: z.string().optional(),
		// 		details: z.array(z.string()).optional(),
		// 		technologies: z.array(z.string()).optional(),
		// 		relatedLink: z.object({
		// 			label: z.string(),
		// 			url: z.string(),
		// 		}).optional(),
		// 	})
		// ).optional(),
		// personalProjects: z.array(
		// 	z.object({
		// 		name: z.string(),
		// 		summary: z.string(),
				
		// 		// ★ここを追加 (.optional() を付けておくと安心です)
		// 		architecture: z.string().optional(),
				
		// 		details: z.array(z.string()),
		// 		technologies: z.array(z.string()),
		// 	})
		// ).optional(),
		interests: z.array(z.string()).optional(),
	}),
});

const projectsCollection = defineCollection({
  type: 'content', // 'data' ではなく 'content' (MDX用) に変更
  schema: z.object({
    name: z.string(),
    summary: z.string(),
    architecture: z.string().optional(),
    technologies: z.array(z.string()),
    projectType: z.enum(['work', 'personal']), // ★ここで分類
    relatedLink: z.object({
      label: z.string(),
      url: z.string(),
    }).optional(),
    // details はMDXの本文に書くのでスキーマからは削除
  }),
});

export const collections = {
	'resume': resumeCollection,
	'projects': projectsCollection,
};
