import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InjectionEnum } from '../../shared/utils/injection.enum';
import { Role } from './entities/roles.entity';
import { RoleRepository } from './repositories/role.repository';
import { RoleService } from './services/role.service';

@Module({
  imports: [forwardRef(() => TypeOrmModule.forFeature([Role]))],
  exports: [InjectionEnum.ROLE_SERVICE],
  providers: [
    {
      provide: InjectionEnum.ROLE_SERVICE,
      useClass: RoleService,
    },
    {
      provide: InjectionEnum.ROLE_REPOSITORY,
      useClass: RoleRepository,
    },
  ],
})
export class RolesModule {}
