import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Collection, CollectionDocument } from './collection.schema';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Injectable()
export class CollectionService {
  constructor(@InjectModel(Collection.name) private collectionModel: Model<CollectionDocument>) {}

  async findOrCreate(userId: string): Promise<CollectionDocument> {
    const userObjectId = new Types.ObjectId(userId);
    let collection = await this.collectionModel.findOne({ user: userObjectId }).exec();

    if (!collection) {
      collection = new this.collectionModel({
        user: userObjectId,
        collection: {
          skin: 'default',
          theme: 'purple',
        },
        ownedSkins: [],
        ownedThemes: [],
      });
      await collection.save();
    }

    return collection;
  }

  async getCollection(userId: string): Promise<Collection> {
    const collection = await this.findOrCreate(userId);
    return collection;
  }

  async updateEquipped(userId: string, skinId?: string, themeId?: string): Promise<Collection> {
    const collectionActual = await this.findOrCreate(userId);
    const updateData: Partial<{ collection: { skin?: string; theme?: string } }> = {};

    if (skinId !== undefined) {
      updateData.collection = {
        ...collectionActual.collection,
        skin: skinId,
      };
    }

    if (themeId !== undefined) {
      updateData.collection = {
        ...collectionActual.collection,
        theme: themeId,
      };
    }

    collectionActual.updatedAt = new Date();
    return collectionActual.save();
  }

  async addFragments(
    userId: string,
    skinId?: string,
    themeId?: string,
    amount: number = 1,
  ): Promise<Collection> {
    const collection = await this.findOrCreate(userId);

    if (skinId) {
      const skinIndex = collection.ownedSkins.findIndex((s) => s.skinId === skinId);
      if (skinIndex >= 0) {
        collection.ownedSkins[skinIndex].fragments += amount;
      } else {
        collection.ownedSkins.push({ skinId, fragments: amount });
      }
    }

    if (themeId) {
      const themeIndex = collection.ownedThemes.findIndex((t) => t.themeId === themeId);
      if (themeIndex >= 0) {
        collection.ownedThemes[themeIndex].fragments += amount;
      } else {
        collection.ownedThemes.push({ themeId, fragments: amount });
      }
    }

    collection.updatedAt = new Date();
    return collection.save();
  }

  async update(userId: string, updateData: UpdateCollectionDto): Promise<Collection> {
    const collectionActual = await this.findOrCreate(userId);

    if (updateData.collection) {
      if (updateData.collection.skin !== undefined) {
        collectionActual.collection.skin = updateData.collection.skin;
      }
      if (updateData.collection.theme !== undefined) {
        collectionActual.collection.theme = updateData.collection.theme;
      }
    }

    if (updateData.ownedSkins) {
      collectionActual.ownedSkins = updateData.ownedSkins;
    }

    if (updateData.ownedThemes) {
      collectionActual.ownedThemes = updateData.ownedThemes;
    }

    collectionActual.updatedAt = new Date();
    return collectionActual.save();
  }
}
