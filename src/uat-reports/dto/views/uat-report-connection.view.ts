import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PageInfo } from '../../../common/types';
import { UATReportView } from './uat-report.view';

@ObjectType()
export class UATReportEdge {
  @Field(() => UATReportView)
  node: UATReportView;

  @Field()
  cursor: string;
}

@ObjectType()
export class UATReportConnection {
  @Field(() => [UATReportEdge])
  edges: UATReportEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => Int)
  totalCount: number;
}
