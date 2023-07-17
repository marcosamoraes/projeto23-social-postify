import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthSigninDto } from 'src/dtos/auth-signin.dto';
import { AuthService } from 'src/services/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('signin')
  async signin(@Body() authSigninDto: AuthSigninDto) {
    return this.authService.signin(authSigninDto);
  }
}
