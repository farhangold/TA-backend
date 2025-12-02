import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UATReportView } from './uat-report.view';

@ObjectType()
export class BatchError {
  @Field(() => Int)
  row: number;

  @Field()
  message: string;

  @Field({ nullable: true })
  data?: string;
}

@ObjectType()
export class BatchUploadResult {
  @Field(() => Int)
  totalProcessed: number;

  @Field(() => Int)
  successful: number;

  @Field(() => Int)
  failed: number;

  @Field(() => [UATReportView])
  reports: UATReportView[];

  @Field(() => [BatchError])
  errors: BatchError[];
}
