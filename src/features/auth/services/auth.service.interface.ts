import { AuthResponseDto } from '../dto/auth-response.dto';
import { LoginRequestDto } from '../dto/login-request.dto';

export interface AuthServiceInterface {
  login(request: LoginRequestDto): Promise<AuthResponseDto>;
}
