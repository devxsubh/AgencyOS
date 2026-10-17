import OpenAI from 'openai';

let client: OpenAI | undefined;

// Created on first use so the build doesn't need OPENAI_API_KEY.
export function getOpenAI(): OpenAI {
  return (client ??= new OpenAI({ apiKey: process.env.OPENAI_API_KEY }));
}
