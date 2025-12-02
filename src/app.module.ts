import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import type { Request, Response } from 'express';
import { GQLErrFormatter } from '@app/gqlerr';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import throttleConfig from './config/throttle.config';
import { DateTimeScalar } from './common/scalars/date-time.scalar';
import { JSONScalar } from './common/scalars/json.scalar';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UATReportsModule } from './uat-reports/uat-reports.module';
import { ScoringRulesModule } from './scoring-rules/scoring-rules.module';
import { EvaluationsModule } from './evaluations/evaluations.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig, throttleConfig],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/graphql',
      autoSchemaFile: true,
      sortSchema: true,
      playground: true,
      introspection: true,
      formatError: GQLErrFormatter,
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }),
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
        dbName: configService.get<string>('database.dbName'),
        connectTimeoutMS: 10000,
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.get<number>('throttle.ttl') || 60,
          limit: configService.get<number>('throttle.limit') || 100,
        },
      ],
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    UATReportsModule,
    ScoringRulesModule,
    EvaluationsModule,
    AuditLogsModule,
  ],
  providers: [DateTimeScalar, JSONScalar],
})
export class AppModule {}
