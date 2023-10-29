import { PromptTemplate } from 'langchain/prompts';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { StreamingTextResponse } from 'ai';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import _ from 'lodash';

export default defineLazyEventHandler(() => {
  const apiKey = useRuntimeConfig().openaiApiKey;
  if (!apiKey) {
    throw createError('Missing OpenAI API key');
  }

  const template =
    'What would be a good company name for a company that makes or provides {product}? Give one best suited option.';
  const promptTemplate = new PromptTemplate({
    template,
    inputVariables: ['product']
  });
  const model = new ChatOpenAI({
    openAIApiKey: apiKey,
    streaming: true,
    temperature: 0.8
  });
  const outputParser = new BytesOutputParser();

  return defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { prompt } = JSON.parse(body);
    const params = { product: prompt };
    console.log(params);
    const stream = await promptTemplate
      .pipe(model)
      .pipe(outputParser)
      .stream(params);
    return new StreamingTextResponse(stream);
  });
});
