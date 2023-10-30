import { PromptTemplate } from 'langchain/prompts';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { StreamingTextResponse } from 'ai';

export default defineLazyEventHandler(() => {
  const apiKey = useRuntimeConfig().openaiApiKey;
  if (!apiKey) {
    throw createError('Missing OpenAI API key');
  }
  const model = new ChatOpenAI({ openAIApiKey: apiKey, temperature: 0.9 });

  return defineEventHandler(async (event) => {
    const body = await readBody(event);
    const params = JSON.parse(body);
    console.log(params);

    const template =
      'What would be a good company name for a company that makes {product}? Give me only one best candidate.';
    const pt = new PromptTemplate({
      template: template,
      inputVariables: ['product']
    });
    const chain = pt.pipe(model).pipe(new BytesOutputParser());
    const stream = await chain.stream({ product: params.prompt });
    return new StreamingTextResponse(stream);
  });
});
