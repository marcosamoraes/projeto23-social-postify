import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserRepositoryContract } from 'src/contracts/user.repository';
import { AuthSigninDto } from 'src/dtos/auth-signin.dto';

@Injectable()
export class AuthService {
  private AUDIENCE = 'user';
  private ISSUER = 'social-postify';

  constructor(
    private readonly userRepository: UserRepositoryContract,
    private readonly jwtService: JwtService,
  ) {}

  async signin(body: AuthSigninDto) {
    const { email, password } = body;
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      throw new UnauthorizedException('Invalid email or password');

    return this.createToken(user);
  }

  createToken(user: User) {
    const token = this.jwtService.sign(
      {
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '7 days',
        subject: String(user.id),
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      },
    );

    return { token };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      });

      return data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
