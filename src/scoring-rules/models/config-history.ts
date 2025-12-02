import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { ConfigType } from '../enums/config-type.enum';
import { AttributeType } from '../enums/attribute-type.enum';
import { JSONScalar } from '../../common/scalars/json.scalar';

@Schema({ timestamps: true })
@ObjectType()
export class ConfigHistory {
  @Field()
  @Prop({ required: true })
  _id: string;

  @Field(() => ConfigType)
  @Prop({ required: true, type: String, enum: ConfigType })
  type: ConfigType;

  @Field(() => AttributeType, { nullable: true })
  @Prop({ required: false, type: String, enum: AttributeType })
  attribute?: AttributeType;

  @Field(() => JSONScalar)
  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  changes: any;

  @Field(() => String)
  @Prop({ required: true, type: MongooseSchema.Types.String, ref: 'User' })
  changedBy: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  reason?: string;

  @Field()
  changedAt: Date;
}

export type ConfigHistoryDocument = HydratedDocument<ConfigHistory>;
export const ConfigHistorySchema = SchemaFactory.createForClass(ConfigHistory);

// Create indexes
ConfigHistorySchema.index({ type: 1 });
ConfigHistorySchema.index({ changedBy: 1 });
ConfigHistorySchema.index({ changedAt: -1 });
