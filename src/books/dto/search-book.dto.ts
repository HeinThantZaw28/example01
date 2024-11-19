import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class SearchBookDto {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  limit: number = 10;
}
