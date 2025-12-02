import { ObjectType, Field } from '@nestjs/graphql';
import { UserRole } from '../../enums/user-role.enum';

@ObjectType()
export class UserView {
  @Field()
  _id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field(() => UserRole)
  role: UserRole;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
