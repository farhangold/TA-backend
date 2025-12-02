import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DashboardStatsView {
  @Field(() => Int)
  totalReports: number;

  @Field(() => Int)
  validReports: number;

  @Field(() => Int)
  invalidReports: number;

  @Field(() => Int)
  pendingReports: number;

  @Field(() => Int)
  evaluatingReports: number;

  @Field(() => Int)
  failedReports: number;

  @Field(() => Int)
  newReports: number; // PENDING_EVALUATION

  @Field(() => Int)
  verifyingReports: number; // PENDING_EVALUATION + EVALUATING
}
