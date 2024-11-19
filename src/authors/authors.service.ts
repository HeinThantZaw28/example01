import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { SearchAuthorDto } from './dto/search-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createAuthorDto: CreateAuthorDto) {
    return this.databaseService.author.create({
      data: createAuthorDto,
    });
  }

  async findAll(searchQuery: SearchAuthorDto) {
    const [authors, total] = await this.databaseService.$transaction([
      this.databaseService.author.findMany({
        skip: (searchQuery.page - 1) * searchQuery.limit,
        take: searchQuery.limit,
      }),
      this.databaseService.author.count(),
    ]);
    return {
      authors,
      totalCount: total,
      page: searchQuery.page,
      limit: searchQuery.limit,
    };
  }

  async findOne(id: number) {
    return this.databaseService.author.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return this.databaseService.author.update({
      where: {
        id,
      },
      data: {
        name: updateAuthorDto.name,
        gender: updateAuthorDto.gender,
      },
    });
  }

  async remove(id: number) {
    return this.databaseService.author.delete({
      where: {
        id,
      },
    });
  }
}
