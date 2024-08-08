"use server";

import { anthropic } from "@ai-sdk/anthropic";
import { streamObject } from "ai";
import { createStreamableValue } from "ai/rsc";
import * as z from "zod";

export async function generateCsvMapping(
  fieldColumns: string[],
  prompt: string,
  firstRows: Record<string, string>[],
  schema: z.AnyZodObject
) {
  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: anthropic("claude-3-sonnet-20240229"),
      schema: schema,
      prompt:
        prompt +
        `Columns:\n${fieldColumns.join(",")}\n\n` +
        `First few rows of data:\n` +
        firstRows.map((row) => JSON.stringify(row)).join("\n"),
      temperature: 0.2,
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { object: stream.value };
}
