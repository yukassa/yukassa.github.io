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
		keyProjects: z.array(
			z.object({
				name: z.string(),
				summary: z.string(),
				architecture: z.string().optional(),
				details: z.array(z.string()).optional(),
				technologies: z.array(z.string()).optional(),
				relatedLink: z.object({
					label: z.string(),
					url: z.string(),
				}).optional(),
			})
		).optional(),
		personalProjects: z.array(
			z.object({
				name: z.string(),
				summary: z.string(),
				details: z.array(z.string()).optional(),
				technologies: z.array(z.string()).optional(),
			})
		).optional(),
		interests: z.array(z.string()).optional(),
	}),
});

// もし他にも collection がある場合はここに追記してください
// 今回のシングルページ構成では resume だけあれば動作します
export const collections = {
	resume: resumeCollection,
};
