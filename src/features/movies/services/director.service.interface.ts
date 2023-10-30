import { Director } from '../entities/director.entity';

export interface DirectorServiceInterface {
  getAll(): Promise<Director[]>;
  validateDirector(directorId: string): Promise<Director>;
}
