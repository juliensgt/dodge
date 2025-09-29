import { IsString, IsOptional, IsEmail, IsObject } from 'class-validator';

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
}
