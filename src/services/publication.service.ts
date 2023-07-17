import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PublicationRepositoryContract } from 'src/contracts/publication.repository';
import { CreatePublicationDto } from 'src/dtos/create-publication.dto';

@Injectable()
export class PublicationService {
  constructor(
    private readonly publicationRepository: PublicationRepositoryContract,
  ) {}

  async create(userId: number, createPublicationDto: CreatePublicationDto) {
    const publicationAlreadyExists =
      await this.publicationRepository.findByTitle(createPublicationDto.title);

    if (publicationAlreadyExists) {
      throw new HttpException('This title already exists', HttpStatus.CONFLICT);
    }

    await this.publicationRepository.create({
      ...createPublicationDto,
      userId,
    });
  }

  async findByUserId(user_id: number) {
    const publications = await this.publicationRepository.findByUserId(user_id);

    return publications;
  }
}
