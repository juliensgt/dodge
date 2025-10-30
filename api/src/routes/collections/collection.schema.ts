import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CollectionDocument = HydratedDocument<Collection>;

@Schema({ collection: 'collections' })
export class Collection {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  user: Types.ObjectId;

  @Prop({
    type: {
      skin: { type: String, default: 'default' },
      theme: { type: String, default: 'purple' },
    },
    default: { skin: 'default', theme: 'purple' },
  })
  collection: {
    skin: string;
    theme: string;
  };

  @Prop({
    type: [
      {
        skinId: String,
        fragments: Number,
      },
    ],
    default: [],
  })
  ownedSkins: Array<{ skinId: string; fragments: number }>;

  @Prop({
    type: [
      {
        themeId: String,
        fragments: Number,
      },
    ],
    default: [],
  })
  ownedThemes: Array<{ themeId: string; fragments: number }>;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
