import { SetMetadata } from '@nestjs/common';

export const RequireActionPoints = (points: number) => SetMetadata('requiredActionPoints', points);
