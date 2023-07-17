import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PublicationRepositoryContract } from 'src/contracts/publication.repository';

@Injectable()
export class PublicationRepository implements PublicationRepositoryContract {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PublicationUncheckedCreateInput) {
    return await this.prisma.publication.create({ data });
  }

  async findByTitle(title: string) {
    return await this.prisma.publication.findUnique({ where: { title } });
  }

  async findByUserId(userId: number) {
    return await this.prisma.publication.findMany({ where: { userId } });
  }
}
