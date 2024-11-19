import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class SearchAuthorDto {
  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  limit?: number;
}
