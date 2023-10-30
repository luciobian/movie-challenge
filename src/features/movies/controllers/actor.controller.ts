import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectionEnum } from '../../../shared/utils/injection.enum';
import { Roles } from '../../auth/decorators/roles.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Actor } from '../entities/actor.entity';
import { ActorServiceInterface } from '../services/actor.service.interface';

@ApiTags('Actors')
@Controller('actors')
@UseGuards(AuthGuard, RolesGuard)
export class ActorController {
  constructor(@Inject(InjectionEnum.ACTOR_SERVICE) private readonly actorService: ActorServiceInterface) {}
  @ApiOperation({ summary: 'Get all actors.' })
  @ApiOkResponse({
    description: 'List of actors.',
    type: Actor,
    isArray: true,
  })
  @Roles('ADMIN', 'REGULAR_USER')
  @ApiBearerAuth('Authorization')
  @Get()
  async getAll(): Promise<Actor[]> {
    return await this.actorService.getAll();
  }
}
