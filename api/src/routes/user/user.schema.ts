import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserRole } from '../../enums/auth/user-role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users' })
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  supabaseId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  email?: string;

  @Prop({ default: 'en' })
  language: string;

  @Prop({ default: UserRole.USER, enum: UserRole })
  role: UserRole;

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

// Virtual populate pour la collection
UserSchema.virtual('collection', {
  ref: 'Collection',
  localField: '_id',
  foreignField: 'user',
  justOne: true,
});

// Activer les virtuals dans les JSON et les populate
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });
