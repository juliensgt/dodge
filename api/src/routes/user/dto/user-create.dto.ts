import { IsString, IsOptional, IsEmail, IsObject, IsEnum } from 'class-validator';
import { UserRole } from '../../../enums/auth/user-role.enum';

export class UserCreateDto {
  @IsString()
  supabaseId: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  skinCards?: string;

  @IsOptional()
  @IsObject()
  userMetadata?: Record<string, any>;

  @IsOptional()
  @IsObject()
  appMetadata?: Record<string, any>;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
