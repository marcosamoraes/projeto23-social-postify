import { User } from '@prisma/client';
import { CreateUserDto } from 'src/dtos/create-user.dto';

export abstract class UserRepositoryContract {
  abstract create(data: CreateUserDto): Promise<User>;
  abstract findUserByEmail(email: string): Promise<User>;
  abstract findUserById(id: number): Promise<User>;
}
