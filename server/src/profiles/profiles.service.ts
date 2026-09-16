import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profiles.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { LoginProfileDto } from './dto/login-profile.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async signup(
    createProfileDto: CreateProfileDto,
  ): Promise<Omit<Profile, 'passwordHash'>> {
    const { fullName, identifier, role, email, password } = createProfileDto;

    const existingUser = await this.profileRepository.findOne({
      where: [{ email }, { identifier }],
    });

    if (existingUser) {
      throw new ConflictException(
        'User with this email or identifier already exists',
      );
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newProfile = this.profileRepository.create({
      fullName,
      identifier,
      role,
      email,
      passwordHash,
    });

    const savedProfile = await this.profileRepository.save(newProfile);

    const { passwordHash: _, ...result } = savedProfile;
    return result;
  }

  async login(loginDto: LoginProfileDto) {
    const { identifier, password } = loginDto;

    const profile = await this.profileRepository.findOne({ where: { identifier } });
    if (!profile) {
      throw new UnauthorizedException('Invalid ID or password');
    }

    const isPasswordValid = await bcrypt.compare(password, profile.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid ID or password');
    }

    const { passwordHash: _, ...result } = profile;

    return {
      message: 'Login successful',
      user: result,
    };
  }

  async findByIdentifier(identifier: string) {
    const profile = await this.profileRepository.findOne({ where: { identifier } });
    if (!profile) {
      throw new UnauthorizedException('Profile not found');
    }
    const { passwordHash: _, ...result } = profile;
    return result;
  }

  async updateProfile(identifier: string, updateData: { fullName?: string; email?: string }) {
    await this.profileRepository.update({ identifier }, updateData);
    return this.findByIdentifier(identifier);
  }

  async changePassword(identifier: string, currentPass: string, newPass: string) {
    const profile = await this.profileRepository.findOne({ where: { identifier } });
    if (!profile) {
      throw new UnauthorizedException('Profile not found');
    }

    const isMatch = await bcrypt.compare(currentPass, profile.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const passwordHash = await bcrypt.hash(newPass, 10);
    await this.profileRepository.update({ identifier }, { passwordHash });

    return { message: 'Password updated successfully' };
  }

  async remove(identifier: string) {
    const profile = await this.profileRepository.findOne({ where: { identifier } });
    if (!profile) {
      throw new UnauthorizedException('Profile not found');
    }
    await this.profileRepository.remove(profile);
    return { message: 'Account deleted successfully' };
  }
}