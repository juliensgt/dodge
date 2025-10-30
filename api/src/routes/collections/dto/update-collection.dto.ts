import { IsOptional, IsObject, IsString, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class CollectionDto {
  @IsOptional()
  @IsString()
  skin?: string;

  @IsOptional()
  @IsString()
  theme?: string;
}

class OwnedSkinDto {
  @IsString()
  skinId: string;

  @IsNumber()
  fragments: number;
}

class OwnedThemeDto {
  @IsString()
  themeId: string;

  @IsNumber()
  fragments: number;
}

export class UpdateCollectionDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CollectionDto)
  collection?: CollectionDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OwnedSkinDto)
  ownedSkins?: OwnedSkinDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OwnedThemeDto)
  ownedThemes?: OwnedThemeDto[];
}
