import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectionEnum } from '../../../shared/utils/injection.enum';
import { Roles } from '../../auth/decorators/roles.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Gender } from '../entities/gender.entity';
import { GenderServiceInterface } from '../services/gender.service.interface';

@ApiTags('Gender')
@Controller('genders')
@UseGuards(AuthGuard, RolesGuard)
export class GenderController {
  constructor(@Inject(InjectionEnum.GENDER_SERVICE) private readonly genderService: GenderServiceInterface) {}
  @ApiOperation({ summary: 'Get all genders.' })
  @ApiOkResponse({
    description: 'List of genders.',
    type: Gender,
    isArray: true,
  })
  @Roles('ADMIN', 'REGULAR_USER')
  @ApiBearerAuth('Authorization')
  @Get()
  async getAll(): Promise<Gender[]> {
    return await this.genderService.getAll();
  }
}
