import { IsEmail, IsEnum, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['ADMIN', 'INTERN', 'ENGINEER'], {
    message: 'Valid role is required',
  })
  role: 'ADMIN' | 'INTERN' | 'ENGINEER';

  @IsNotEmpty()
  @IsString()
  @Min(4)
  password: string;
}
