import { Gender } from '../entities/gender.entity';

export interface GenderRepositoryInterface {
  getAll(): Promise<Gender[]>;
  getById(id: string): Promise<Gender>;
}
