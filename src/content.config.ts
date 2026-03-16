import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const hideElementValues = [
	'title',
	'date',
	'lastmod',
	'tags',
	'readingTime',
	'comments',
] as const;
const hideElements = z.enum(hideElementValues);
export type PostHideElements = (typeof hideElementValues)[number];

const posts = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			slug: z.string().optional(),
			description: z.string().optional(),
			image: image().optional(),
			date: z.date().optional(),
			lastmod: z.date().optional(),
			hidden: z.boolean().optional(),
			tags: z.array(z.string()).optional(),
			readingTime: z
				.object({
					text: z.string(),
					time: z.number(),
					words: z.number(),
					minutes: z.number(),
				})
				.optional(),
			hide: z.array(hideElements).optional(),
		}),
});

export const collections = {
	posts,
};
