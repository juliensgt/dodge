import { httpService } from "../http/http.service";

export interface Collection {
  id: string;
  userId: string;
  selectedCollection: {
    skin: string;
    theme: string;
  };
  ownedSkins: Array<{ skinId: string; fragments: number }>;
  ownedThemes: Array<{ themeId: string; fragments: number }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateCollectionDto {
  selectedCollection?: {
    skin?: string;
    theme?: string;
  };
}

class CollectionService {
  async getCollection(): Promise<Collection> {
    const collection = await httpService.get<Collection>("/collections/me");
    return collection;
  }

  async updateEquipped(skinId?: string, themeId?: string): Promise<Collection> {
    const updateData: UpdateCollectionDto = {};

    if (skinId !== undefined || themeId !== undefined) {
      updateData.selectedCollection = {};
      if (skinId !== undefined) {
        updateData.selectedCollection.skin = skinId;
      }
      if (themeId !== undefined) {
        updateData.selectedCollection.theme = themeId;
      }
    }

    return await httpService.put<Collection>("/collections/me", updateData);
  }
}

export const collectionService = new CollectionService();
