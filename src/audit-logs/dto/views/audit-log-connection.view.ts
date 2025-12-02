import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PageInfo } from '../../../common/types';
import { AuditLogView } from './audit-log.view';

@ObjectType()
export class AuditLogEdge {
  @Field(() => AuditLogView)
  node: AuditLogView;

  @Field()
  cursor: string;
}

@ObjectType()
export class AuditLogConnection {
  @Field(() => [AuditLogEdge])
  edges: AuditLogEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => Int)
  totalCount: number;
}
