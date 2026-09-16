import { Controller, Post, Body, HttpCode, HttpStatus, Get, Patch, Param, Delete } from '@nestjs/common';
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

  @Get(':identifier')
  async getProfile(@Param('identifier') identifier: string) {
    return this.profilesService.findByIdentifier(identifier);
  }

  @Patch(':identifier')
  async updateProfile(
    @Param('identifier') identifier: string,
    @Body() body: { fullName?: string; email?: string },
  ) {
    return this.profilesService.updateProfile(identifier, body);
  }

  @Patch(':identifier/password')
  async changePassword(
    @Param('identifier') identifier: string,
    @Body() body: { currentPassword: string; newPassword: string },
  ) {
    return this.profilesService.changePassword(
      identifier,
      body.currentPassword,
      body.newPassword,
    );
  }

  @Delete(':identifier(*)')
  async deleteProfile(@Param('identifier') identifier: string) {
    return this.profilesService.remove(identifier);
  }
}