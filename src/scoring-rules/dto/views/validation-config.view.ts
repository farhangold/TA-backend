import { ObjectType, Field, Float } from '@nestjs/graphql';
import { UserView } from '../../../users/dto/views/user.view';

@ObjectType()
export class ValidationConfigView {
  @Field()
  _id: string;

  @Field(() => Float)
  threshold: number;

  @Field(() => UserView)
  updatedBy: UserView;

  @Field()
  updatedAt: Date;
}
