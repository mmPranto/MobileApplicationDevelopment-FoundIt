import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profiles.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
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
}
