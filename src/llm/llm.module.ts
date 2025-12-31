import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import llmConfig from './config/llm.config';
import { LLMEvaluationService } from './services/llm-evaluation.service';
import { PromptBuilderService } from './services/prompt-builder.service';
import { LLMCacheService } from './services/llm-cache.service';

@Module({
  imports: [
    ConfigModule.forFeature(llmConfig),
    CacheModule.register({
      ttl: 86400000, // 24 hours default
      max: 1000, // Maximum number of items in cache
    }),
  ],
  providers: [
    LLMEvaluationService,
    PromptBuilderService,
    LLMCacheService,
  ],
  exports: [
    LLMEvaluationService,
    PromptBuilderService,
    LLMCacheService,
  ],
})
export class LLMModule {}

