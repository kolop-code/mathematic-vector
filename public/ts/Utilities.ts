import { collections} from "../../src/content.config.ts";
import { unified } from 'unified';
import { z } from 'astro/zod';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

type CreateUnion<Max extends number, Accumulator extends number[] = []> = Accumulator["length"] extends Max
    ? Accumulator[number] : CreateUnion<Max, [...Accumulator, Accumulator["length"]]>;

export type IntRange<Min extends number, Max extends number> = Exclude<CreateUnion<Max>, CreateUnion<Min>>;

export type CollectionNames = keyof typeof collections;

const processor = unified()
    .use(remarkMath)
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeStringify)

export async function renderMath(text: string) {
    return (await processor.process(text)).toString()
}

export const schema = z.object({
    title: z.string(),
    order: z.number(),
    questions: z.array(
        z.object({
            type: z.string(),
            question: z.string(),
            order: z.number(),
            answers: z.array(
                z.object({
                    char: z.number(),
                    text: z.string()
                })
            )
        })
    ).optional()
})

export type Schema = z.infer<typeof schema>;