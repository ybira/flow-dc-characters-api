import { Role } from '@api/database/entities/user.entity';
import { CreateUserDto } from '@api/users/models/create-user.dto';

export const users: CreateUserDto[] = [
  {
    firstName: 'Admin',
    lastName: 'Test',
    email: 'admin@test.com',
    role: Role.ADMIN,
    password: 'password'
  },
  {
    firstName: 'Reader',
    lastName: 'Test',
    email: 'reader@test.com',
    role: Role.READER,
    password: 'password'
  },
  {
    firstName: 'Editor',
    lastName: 'Test',
    email: 'editor@test.com',
    role: Role.EDITOR,
    password: 'password'
  }
];
