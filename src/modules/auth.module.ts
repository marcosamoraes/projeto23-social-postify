import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'nestjs-prisma';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { UserModule } from './user.module';
import { UserRepository } from 'src/repositories/user.repository';
import { UserRepositoryContract } from 'src/contracts/user.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    PrismaModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    {
      provide: UserRepositoryContract,
      useClass: UserRepository,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
