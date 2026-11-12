import { defineCollection} from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const topics = defineCollection({
    loader: glob({
        pattern: '**/*.{md,json}',
        base: './src/content/topics'
    }),

    schema: z.object({
        title: z.string(),
        order: z.number()
    })
});

export const collections = { topics };