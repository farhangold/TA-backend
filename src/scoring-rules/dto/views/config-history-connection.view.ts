import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PageInfo } from '../../../common/types';
import { ConfigHistoryView } from './config-history.view';

@ObjectType()
export class ConfigHistoryEdge {
  @Field(() => ConfigHistoryView)
  node: ConfigHistoryView;

  @Field()
  cursor: string;
}

@ObjectType()
export class ConfigHistoryConnection {
  @Field(() => [ConfigHistoryEdge])
  edges: ConfigHistoryEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => Int)
  totalCount: number;
}
