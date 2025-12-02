import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

@Schema({ _id: false })
@ObjectType()
export class TestIdentity {
  @Field()
  @Prop({ required: true })
  testId: string;

  @Field()
  @Prop({ required: true })
  title: string;

  @Field()
  @Prop({ required: true })
  version: string;
}

export const TestIdentitySchema = SchemaFactory.createForClass(TestIdentity);
