import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { LoginProfileDto } from './dto/login-profile.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createProfileDto: CreateProfileDto) {
    return await this.profilesService.signup(createProfileDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginProfileDto) {
    return this.profilesService.login(loginDto);
  }
}