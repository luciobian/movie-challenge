import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'role' })
export class Role extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => User, (users) => users.role)
  users: User[];
}
