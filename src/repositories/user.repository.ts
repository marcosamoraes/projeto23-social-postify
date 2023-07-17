import { Injectable } from '@nestjs/common';
import { UserRepositoryContract } from 'src/contracts/user.repository';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository implements UserRepositoryContract {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return await this.prisma.user.create({ data });
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findUserById(id: number) {
    return await this.prisma.user.findUnique({ where: { id } });
  }
}
