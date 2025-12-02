import { ObjectType, Field } from '@nestjs/graphql';
import { UserView } from '../../../users/dto/views/user.view';

@ObjectType()
export class AuthPayload {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => UserView)
  user: UserView;
}
