import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.create(CreateUserDto);
  }
}
