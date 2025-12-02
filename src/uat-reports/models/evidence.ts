import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { EvidenceType } from '../enums/evidence-type.enum';

@Schema({ _id: false })
@ObjectType()
export class Evidence {
  @Field(() => EvidenceType)
  @Prop({ required: true, type: String, enum: EvidenceType })
  type: EvidenceType;

  @Field()
  @Prop({ required: true })
  url: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  description?: string;
}

export const EvidenceSchema = SchemaFactory.createForClass(Evidence);
