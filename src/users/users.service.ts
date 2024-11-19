import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'johndoe',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'janesmith',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      password: 'bobjohnson',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Alice Wilson',
      email: 'alice@example.com',
      password: 'alicewilson',
      role: 'INTERN',
    },
  ];

  getUsers(role?: 'ADMIN' | 'INTERN' | 'ENGINEER') {
    if (role) {
      const usersWithRole = this.users.filter((user) => user.role === role);
      return usersWithRole;
    }
    return this.users;
  }

  getUserById(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id-${id} not found`);
    }
    return user;
  }

  async findOne(email: string) {
    return this.users.find((user) => user.email === email);
  }

  createUser(createUserDto: CreateUserDto) {
    const userByHighestId = this.users.sort((a, b) => b.id - a.id);
    const newUser = {
      id: userByHighestId[0].id + 1,
      name: createUserDto.name,
      email: createUserDto.email,
      role: createUserDto.role,
      password: createUserDto.password,
    };
    this.users.push(newUser);
    return this.users.sort((a, b) => a.id - b.id);
  }

  updateUser(id: number, updatedUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUserDto };
      }
      return user;
    });
    return this.users;
  }

  deleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
    return this.users;
  }
}
