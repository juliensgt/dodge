import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserWithId = User & { _id: Types.ObjectId };
export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users' })
export class User {
  @Prop({ required: true, unique: true })
  supabaseId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  email?: string;

  @Prop()
  skinCards: string;

  @Prop({ default: 'en' })
  language: string;

  @Prop({ type: Object })
  userMetadata?: Record<string, any>;

  @Prop({ type: Object })
  appMetadata?: Record<string, any>;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
