import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { SearchBookDto } from './dto/search-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createBookDto: Prisma.BookCreateInput) {
    return this.databaseService.book.create({
      data: createBookDto,
    });
  }

  async findAll(query: SearchBookDto) {
    // return this.databaseService.book.findMany();
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [books, totalCount] = await this.databaseService.$transaction([
      this.databaseService.book.findMany({
        skip,
        take: limit,
      }),
      this.databaseService.book.count(),
    ]);
    return { books, totalCount, page, limit };
  }

  async findOne(id: number) {
    return this.databaseService.book.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateBookDto: Prisma.BookUpdateInput) {
    return this.databaseService.book.update({
      where: {
        id,
      },
      data: updateBookDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.book.delete({
      where: {
        id,
      },
    });
  }
}
