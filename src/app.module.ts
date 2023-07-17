import { Module } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { PublicationModule } from './modules/publication.module';
import { AuthModule } from './modules/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, PublicationModule, PrismaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
