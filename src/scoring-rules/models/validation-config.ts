import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType, Float } from '@nestjs/graphql';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
@ObjectType()
export class ValidationConfig {
  @Field()
  @Prop({ required: true })
  _id: string;

  @Field(() => Float)
  @Prop({ required: true, default: 70 })
  threshold: number;

  @Field(() => String)
  @Prop({ required: true, type: MongooseSchema.Types.String, ref: 'User' })
  updatedBy: string;

  @Field()
  updatedAt: Date;
}

export type ValidationConfigDocument = HydratedDocument<ValidationConfig>;
export const ValidationConfigSchema =
  SchemaFactory.createForClass(ValidationConfig);
