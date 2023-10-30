import { Gender } from '../entities/gender.entity';

export interface GenderServiceInterface {
  getAll(): Promise<Gender[]>;
  validateGender(genderId: string): Promise<Gender>;
}
