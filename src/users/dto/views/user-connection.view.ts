import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PageInfo } from '../../../common/types';
import { UserView } from './user.view';

@ObjectType()
export class UserEdge {
  @Field(() => UserView)
  node: UserView;

  @Field()
  cursor: string;
}

@ObjectType()
export class UserConnection {
  @Field(() => [UserEdge])
  edges: UserEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => Int)
  totalCount: number;
}
