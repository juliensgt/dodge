import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { AuthenticatedUserHttp } from '../../common/decorators/authenticated-user-http.decorator';
import { User } from '../user/user.schema';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CollectionDto } from './dto/collection.dto';

@Controller('collections')
@UseGuards(AuthGuard)
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get('me')
  async getMyCollection(@AuthenticatedUserHttp() user: User): Promise<CollectionDto> {
    const collection = await this.collectionService.getCollection(user._id.toString());

    return {
      id: collection._id.toString(),
      userId: user._id.toString(),
      selectedCollection: collection.selectedCollection,
      ownedSkins: collection.ownedSkins,
      ownedThemes: collection.ownedThemes,
      createdAt: collection.createdAt,
      updatedAt: collection.updatedAt,
    };
  }

  @Put('me')
  async updateMyCollection(
    @AuthenticatedUserHttp() user: User,
    @Body() updateData: UpdateCollectionDto,
  ): Promise<CollectionDto> {
    const collection = await this.collectionService.update(user._id.toString(), updateData);

    return {
      id: collection._id.toString(),
      userId: user._id.toString(),
      selectedCollection: collection.selectedCollection,
      ownedSkins: collection.ownedSkins,
      ownedThemes: collection.ownedThemes,
      createdAt: collection.createdAt,
      updatedAt: collection.updatedAt,
    };
  }
}
