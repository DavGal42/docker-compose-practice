import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ERROR_MESSAGES } from '../../common/messages';
import { User } from '../../database/entities';
import { BaseQueryDto } from '../../common/dto/page-options.dto';
import _ from 'lodash';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async create(body: CreateUserDto): Promise<User> {
    const { email, phone } = body;
    try {
      const existingUser: User = await this.findOne({ phone });

      if (existingUser) {
        throw new BadRequestException(ERROR_MESSAGES.USER_ALREADY_EXISTS);
      }
      const userByEmail: User = await this.findOne({ email });

      if (userByEmail) {
        throw new BadRequestException(ERROR_MESSAGES.USER_EMAIL_ALREADY_EXISTS);
      }

      const user: User = await this.userRepo.save({
        ...body,
      });

      return user;
    } catch (e) {
      throw e;
    }
  }
  async findOne(params: Partial<User>): Promise<User> {
    return this.userRepo.findOne({ where: params });
  }
  async findAll(dto: BaseQueryDto): Promise<[User[], number]> {
    return await this.userRepo.findAndCount(dto);
  }
  async update(id: number, dto: UpdateUserDto): Promise<User> {
    try {
      const user: User = await this.userRepo.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(ERROR_MESSAGES.USER_NOT_EXISTS);
      }
      const updateResult = await this.userRepo.update(id, { ...dto });
      if (updateResult.affected === 0) {
        throw new Error('No rows updated. Check your DTO for valid data.');
      }
      const updatedUser: User = await this.userRepo.findOne({ where: { id } });
      return updatedUser;
    } catch (e) {
      console.error('Error during update:', e);
      throw e;
    }
  }
  async delete(user: User): Promise<void> {
    try {
      await this.userRepo.remove(user);
    } catch (e) {
      throw e;
    }
  }
}
