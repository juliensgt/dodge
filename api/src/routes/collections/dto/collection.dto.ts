export class CollectionDto {
  id: string;
  userId: string;
  collection: {
    skin: string;
    theme: string;
  };
  ownedSkins: Array<{ skinId: string; fragments: number }>;
  ownedThemes: Array<{ themeId: string; fragments: number }>;
  createdAt: Date;
  updatedAt: Date;
}
