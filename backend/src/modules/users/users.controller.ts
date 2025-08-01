import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Body,
  Post,
  Get,
  Query,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../../database/entities';
import { BaseQueryDto } from '../../common/dto/page-options.dto';
import { IResponseItem } from '../../common/interfaces';
import { MetaResponse } from '../../common/helpers';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdParamDTO } from '../../common/dto';
import { ERROR_MESSAGES } from '../../common/messages';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOkResponse({ description: 'User created.', type: User })
  @ApiOperation({ description: 'Create a new user.', summary: 'Create user' })
  async create(@Body() body: CreateUserDto): Promise<IResponseItem<User>> {
    return { data: await this.usersService.create(body) };
  }

  @Get()
  @ApiOkResponse({ description: 'Users list retrieved.', type: [User] })
  @ApiOperation({
    description: 'Get users based on filters.',
    summary: 'Get users',
  })
  async findAll(@Query() query: BaseQueryDto) {
    const { take, skip } = query;
    const [data, count] = await this.usersService.findAll(query);
    return {
      data,
      meta: MetaResponse.generateMetaResponse(skip, take, count),
    };
  }
  @Get(':id')
  @ApiOkResponse({ description: 'User details retrieved.', type: User })
  @ApiOperation({ description: 'Get user by ID.', summary: 'Get user by ID' })
  async findOne(@Param() { id }: IdParamDTO): Promise<IResponseItem<User>> {
    return { data: await this.usersService.findOne({ id }) };
  }
  @Patch(':id')
  @ApiOkResponse({ description: 'User updated.', type: User })
  @ApiOperation({ description: 'Update user details.', summary: 'Update user' })
  async update(
    @Param() { id }: IdParamDTO,
    @Body() dto: UpdateUserDto,
  ): Promise<IResponseItem<User>> {
    return { data: await this.usersService.update(id, dto) };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({ description: 'User deleted.' })
  @ApiOperation({ description: 'Delete user by ID.', summary: 'Delete user' })
  async delete(@Param() { id }: IdParamDTO): Promise<void> {
    const user: User = await this.usersService.findOne({ id });
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_EXISTS);
    }
    await this.usersService.delete(user);
  }
}
