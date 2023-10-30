import { Director } from '../entities/director.entity';

export interface DirectorRepositoryInterface {
  getAll(): Promise<Director[]>;
  getById(id: string): Promise<Director>;
}
