import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

@Schema({ _id: false })
@ObjectType()
export class TestEnvironment {
  @Field()
  @Prop({ required: true })
  os: string;

  @Field()
  @Prop({ required: true })
  browser: string;

  @Field()
  @Prop({ required: true })
  device: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  additionalInfo?: string;
}

export const TestEnvironmentSchema =
  SchemaFactory.createForClass(TestEnvironment);
