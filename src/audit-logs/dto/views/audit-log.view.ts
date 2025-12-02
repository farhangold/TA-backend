import { ObjectType, Field } from '@nestjs/graphql';
import { AuditAction } from '../../enums/audit-action.enum';
import { AuditEntity } from '../../enums/audit-entity.enum';
import { UserView } from '../../../users/dto/views/user.view';
import { JSONScalar } from '../../../common/scalars/json.scalar';

@ObjectType()
export class AuditLogView {
  @Field()
  _id: string;

  @Field(() => UserView)
  user: UserView;

  @Field(() => AuditAction)
  action: AuditAction;

  @Field(() => AuditEntity)
  entity: AuditEntity;

  @Field()
  entityId: string;

  @Field(() => JSONScalar, { nullable: true })
  changes?: any;

  @Field({ nullable: true })
  ipAddress?: string;

  @Field({ nullable: true })
  userAgent?: string;

  @Field()
  timestamp: Date;
}
