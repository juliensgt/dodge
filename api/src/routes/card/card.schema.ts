import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ActionType } from '../../enums/action-type.enum';

export type CardDocument = HydratedDocument<Card>;

@Schema({ collection: 'cards' })
export class Card {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: String, enum: ActionType })
  pouvoir: ActionType;

  @Prop()
  points: number;

  @Prop()
  valeur: string;

  @Prop()
  couleur: string;

  @Prop()
  img: string;

  @Prop([String])
  modeDeJeu: string[];
}

export const CardSchema = SchemaFactory.createForClass(Card);
