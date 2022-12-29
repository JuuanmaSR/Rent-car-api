import { SetMetadata } from '@nestjs/common';
import { Role } from '../guards/role.enum';

export const Roles = (role: Role) => SetMetadata('role', role);