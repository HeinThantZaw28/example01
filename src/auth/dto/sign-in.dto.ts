import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Min } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
