import { Role } from '../../src/features/roles/entities/roles.entity';
import { User } from '../../src/features/users/entities/user.entity';

export const regularUserMock: User = {
  name: 'Mock Name User',
  email: 'user@mock.dto',
  password: 'thisIsAHashPasswordMock',
  role: { name: 'REGULAR_USER' } as Role,
  id: 'uuidMockUser',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
} as User;
