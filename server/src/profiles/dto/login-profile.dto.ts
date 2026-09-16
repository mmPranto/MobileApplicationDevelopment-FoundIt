import { IsString, IsNotEmpty } from 'class-validator';

export class LoginProfileDto {
  @IsString()
  @IsNotEmpty({ message: 'Institutional ID is required' })
  identifier: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}