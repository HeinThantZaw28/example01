import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Prisma } from '@prisma/client';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { SearchAuthorDto } from './dto/search-author.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('authors')
@ApiBearerAuth('access-token')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  async findAll(@Query() searchQuery: SearchAuthorDto) {
    return this.authorsService.findAll(searchQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.authorsService.remove(+id);
  }
}
