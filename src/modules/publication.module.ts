import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PublicationRepositoryContract } from 'src/contracts/publication.repository';
import { UserRepositoryContract } from 'src/contracts/user.repository';
import { PublicationController } from 'src/controllers/publication.controller';
import { PublicationRepository } from 'src/repositories/publication.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { AuthService } from 'src/services/auth.service';
import { PublicationService } from 'src/services/publication.service';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET })],
  controllers: [PublicationController],
  providers: [
    PublicationService,
    AuthService,
    UserService,
    {
      provide: UserRepositoryContract,
      useClass: UserRepository,
    },
    PublicationService,
    {
      provide: PublicationRepositoryContract,
      useClass: PublicationRepository,
    },
  ],
})
export class PublicationModule {}
