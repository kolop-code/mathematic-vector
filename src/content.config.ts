import { defineCollection} from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import {schema} from "../public/ts/Utilities.ts";

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

const autotests = defineCollection({
    loader: glob({
        pattern: '**/*.json',
        base: "./src/content/autotests"
    }),

    schema: schema
})

export const collections = { topics, autotests };