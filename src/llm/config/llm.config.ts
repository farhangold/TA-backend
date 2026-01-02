import { registerAs } from '@nestjs/config';

export default registerAs('llm', () => ({
  apiKey: process.env.OPENAI_API_KEY || '',
  model: process.env.OPENAI_MODEL || 'gpt-4o',
  temperature: process.env.OPENAI_TEMPERATURE
    ? parseFloat(process.env.OPENAI_TEMPERATURE)
    : 0.2,
  timeout: process.env.OPENAI_TIMEOUT
    ? parseInt(process.env.OPENAI_TIMEOUT, 10)
    : 30000,
  maxRetries: process.env.OPENAI_MAX_RETRIES
    ? parseInt(process.env.OPENAI_MAX_RETRIES, 10)
    : 3,
  cacheEnabled: process.env.LLM_CACHE_ENABLED !== 'false',
  cacheTTL: process.env.LLM_CACHE_TTL
    ? parseInt(process.env.LLM_CACHE_TTL, 10)
    : 86400000, // 24 hours in milliseconds
}));

