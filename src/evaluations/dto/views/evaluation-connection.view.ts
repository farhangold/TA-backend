import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PageInfo } from '../../../common/types';
import { EvaluationView } from './evaluation.view';

@ObjectType()
export class EvaluationEdge {
  @Field(() => EvaluationView)
  node: EvaluationView;

  @Field()
  cursor: string;
}

@ObjectType()
export class EvaluationConnection {
  @Field(() => [EvaluationEdge])
  edges: EvaluationEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => Int)
  totalCount: number;
}
