import { UserRole } from '../../../enums/auth/user-role.enum';

export class UserDetailsDto {
  _id: string;
  supabaseId: string;
  name: string;
  email?: string;
  skinCards: string;
  language: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
