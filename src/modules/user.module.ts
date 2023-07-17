import { Module } from '@nestjs/common';
import { UserRepositoryContract } from 'src/contracts/user.repository';
import { UserController } from 'src/controllers/user.controller';
import { UserRepository } from 'src/repositories/user.repository';
import { UserService } from 'src/services/user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UserRepositoryContract,
      useClass: UserRepository,
    },
  ],
  exports: [
    UserService,
    {
      provide: UserRepositoryContract,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
