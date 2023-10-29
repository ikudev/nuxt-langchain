import { SerpAPI } from 'langchain/tools';
import { Calculator } from 'langchain/tools/calculator';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { PromptTemplate } from 'langchain/prompts';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { LangChainStream, StreamingTextResponse } from 'ai';

export default defineLazyEventHandler(() => {
  const apiKey = useRuntimeConfig().openaiApiKey;
  if (!apiKey) {
    throw createError('Missing OpenAI API key');
  }

  const model = new ChatOpenAI({ openAIApiKey: apiKey });

  const serpApiKey = useRuntimeConfig().serpApiKey;
  if (!serpApiKey) {
    throw createError('Missing SerpApi key');
  }

  return defineEventHandler(async (event) => {
    const body = await readBody(event);
    const params = JSON.parse(body);
    console.log(params);

    const tools = [new SerpAPI(serpApiKey), new Calculator()];
    const executor = await initializeAgentExecutorWithOptions(tools, model, {
      agentType: 'zero-shot-react-description'
    });

    const { output } = await executor.invoke({ input: params.prompt });
    return output;
  });
});
