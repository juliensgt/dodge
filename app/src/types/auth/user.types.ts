export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface User {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  supabaseId: string;
  skinCards: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}
