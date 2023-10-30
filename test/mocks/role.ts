import { Role } from '../../src/features/roles/entities/roles.entity';
import { User } from '../../src/features/users/entities/user.entity';

export const roleRegularUserMock: Role = {
  name: 'REGULAR_USER',
  users: [] as User[],
  id: 'df298f6e-74f3-11ee-b962-0242ac120002',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: undefined,
};
