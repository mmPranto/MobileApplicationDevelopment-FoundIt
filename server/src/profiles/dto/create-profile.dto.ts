import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty({ message: 'Full name is required' })
  @IsString()
  fullName: string;

  @IsNotEmpty({ message: 'ID is required' })
  @IsString()
  identifier: string;

  @IsNotEmpty({ message: 'Role is required' })
  @Matches(/^(student|teacher)$/, {
    message: 'Role must be either "student" or "teacher"',
  })
  role: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}