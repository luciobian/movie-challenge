import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectionEnum } from '../../../shared/utils/injection.enum';
import { Roles } from '../../auth/decorators/roles.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Director } from '../entities/director.entity';
import { DirectorServiceInterface } from '../services/director.service.interface';

@ApiTags('Directors')
@Controller('directors')
@UseGuards(AuthGuard, RolesGuard)
export class DirectorController {
  constructor(@Inject(InjectionEnum.DIRECTOR_SERVICE) private readonly directorService: DirectorServiceInterface) {}
  @ApiOperation({ summary: 'Get all directors.' })
  @ApiOkResponse({
    description: 'List of Directors.',
    type: Director,
    isArray: true,
  })
  @Roles('ADMIN', 'REGULAR_USER')
  @ApiBearerAuth('Authorization')
  @Get()
  async getAll(): Promise<Director[]> {
    return await this.directorService.getAll();
  }
}
