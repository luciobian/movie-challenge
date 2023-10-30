import { Role } from '../entities/roles.entity';

export interface RoleServiceInterface {
  getByName(name: string): Promise<Role>;
}
