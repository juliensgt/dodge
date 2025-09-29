export class UserDetailsDto {
  _id: string;
  supabaseId: string;
  name: string;
  email?: string;
  skinCards: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}
