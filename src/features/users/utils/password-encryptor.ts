import { PasswordEncryptorInterface } from './password-encryptor.interface';
import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordEncryptor implements PasswordEncryptorInterface {
  async encryptPassword(plainTextPassword: string): Promise<string> {
    const saltRounds = 10;
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(plainTextPassword, salt);
      return hash;
    } catch (error) {
      throw error;
    }
  }
  async comparePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(plainTextPassword, hashedPassword);
    } catch (error) {
      throw error;
    }
  }
}
