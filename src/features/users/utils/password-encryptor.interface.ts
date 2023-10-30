export interface PasswordEncryptorInterface {
  encryptPassword(plainTextPassword: string): Promise<string>;
  comparePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}
