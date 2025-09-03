import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserWithId = User & { _id: Types.ObjectId };
export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users' })
export class User {
  @Prop()
  name: string;

  @Prop()
  skinCards: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
