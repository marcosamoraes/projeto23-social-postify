import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRequest } from 'src/decorators/user-request.decorator';
import { CreatePublicationDto } from 'src/dtos/create-publication.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { PublicationService } from 'src/services/publication.service';

@Controller()
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @UseGuards(AuthGuard)
  @Post('publication')
  create(
    @Body() createPublicationDto: CreatePublicationDto,
    @UserRequest() user: User,
  ) {
    const { id } = user;
    return this.publicationService.create(id, createPublicationDto);
  }

  @UseGuards(AuthGuard)
  @Get('publications')
  getMyPublications(@UserRequest() user: User) {
    const { id } = user;
    return this.publicationService.findByUserId(id);
  }
}
