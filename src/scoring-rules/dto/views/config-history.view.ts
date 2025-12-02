import { ObjectType, Field } from '@nestjs/graphql';
import { ConfigType } from '../../enums/config-type.enum';
import { AttributeType } from '../../enums/attribute-type.enum';
import { UserView } from '../../../users/dto/views/user.view';
import { JSONScalar } from '../../../common/scalars/json.scalar';

@ObjectType()
export class ConfigHistoryView {
  @Field()
  _id: string;

  @Field(() => ConfigType)
  type: ConfigType;

  @Field(() => AttributeType, { nullable: true })
  attribute?: AttributeType;

  @Field(() => JSONScalar)
  changes: any;

  @Field(() => UserView)
  changedBy: UserView;

  @Field({ nullable: true })
  reason?: string;

  @Field()
  changedAt: Date;
}
