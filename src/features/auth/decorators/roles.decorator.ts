import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from '../utils/roles.enum';

export const Roles = (...roles: Array<keyof typeof RolesEnum>) => SetMetadata('ROLES', roles);
