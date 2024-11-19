import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({
    title: "Enter Author's Name",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    title: "Enter Gender 'MALE', 'FEMALE' or 'OTHERS'",
  })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;
}
