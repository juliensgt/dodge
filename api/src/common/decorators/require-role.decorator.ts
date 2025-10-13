import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../enums/auth/user-role.enum';

export const RequireRole = (...roles: UserRole[]) => SetMetadata('roles', roles);
