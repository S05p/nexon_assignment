import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../common-variables';
import { Role } from './auth.dto';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);