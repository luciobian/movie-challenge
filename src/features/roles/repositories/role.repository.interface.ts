import { Role } from '../entities/roles.entity';

export interface RoleRepositoryInterface {
  getByName(name: string): Promise<Role>;
}
