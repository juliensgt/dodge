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
        selectedCollection: {
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
    const collection = await this.findOrCreate(userId);
    const updateData: Partial<{ selectedCollection: { skin?: string; theme?: string } }> = {};

    if (skinId !== undefined) {
      updateData.selectedCollection = {
        ...collection.selectedCollection,
        skin: skinId,
      };
    }

    if (themeId !== undefined) {
      updateData.selectedCollection = {
        ...collection.selectedCollection,
        theme: themeId,
      };
    }

    if (updateData.selectedCollection) {
      collection.selectedCollection = {
        ...collection.selectedCollection,
        ...updateData.selectedCollection,
      };
    }

    collection.updatedAt = new Date();
    return collection.save();
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
    const collection = await this.findOrCreate(userId);

    if (updateData.selectedCollection) {
      // Only update properties that are explicitly provided
      if (updateData.selectedCollection.skin !== undefined) {
        collection.selectedCollection.skin = updateData.selectedCollection.skin;
      }
      if (updateData.selectedCollection.theme !== undefined) {
        collection.selectedCollection.theme = updateData.selectedCollection.theme;
      }
    }

    if (updateData.ownedSkins) {
      collection.ownedSkins = updateData.ownedSkins;
    }

    if (updateData.ownedThemes) {
      collection.ownedThemes = updateData.ownedThemes;
    }

    collection.updatedAt = new Date();
    return collection.save();
  }
}
