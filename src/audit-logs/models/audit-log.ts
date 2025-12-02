import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { AuditAction } from '../enums/audit-action.enum';
import { AuditEntity } from '../enums/audit-entity.enum';
import { JSONScalar } from '../../common/scalars/json.scalar';

@Schema({ timestamps: true })
@ObjectType()
export class AuditLog {
  @Field()
  @Prop({ required: true })
  _id: string;

  @Field(() => String)
  @Prop({ required: true, type: MongooseSchema.Types.String, ref: 'User' })
  user: string;

  @Field(() => AuditAction)
  @Prop({ required: true, type: String, enum: AuditAction })
  action: AuditAction;

  @Field(() => AuditEntity)
  @Prop({ required: true, type: String, enum: AuditEntity })
  entity: AuditEntity;

  @Field()
  @Prop({ required: true })
  entityId: string;

  @Field(() => JSONScalar, { nullable: true })
  @Prop({ required: false, type: MongooseSchema.Types.Mixed })
  changes?: any;

  @Field({ nullable: true })
  @Prop({ required: false })
  ipAddress?: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  userAgent?: string;

  @Field()
  timestamp: Date;
}

export type AuditLogDocument = HydratedDocument<AuditLog>;
export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);

// Create indexes
AuditLogSchema.index({ user: 1 });
AuditLogSchema.index({ action: 1 });
AuditLogSchema.index({ entity: 1 });
AuditLogSchema.index({ timestamp: -1 });
AuditLogSchema.index({ user: 1, timestamp: -1 });
