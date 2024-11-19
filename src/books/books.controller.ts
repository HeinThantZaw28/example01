import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Prisma } from '@prisma/client';
import { SearchBookDto } from './dto/search-book.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
// import { CreateBookDto } from './dto/create-book.dto';
// import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
@ApiBearerAuth('access-token')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: Prisma.BookCreateInput) {
    return this.booksService.create(createBookDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() query: SearchBookDto) {
    return this.booksService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: Prisma.BookUpdateInput,
  ) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
