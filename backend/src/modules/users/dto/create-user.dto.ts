import { TransformFnParams, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsPhoneNumber,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsString,
  IsEmail,
  Matches,
} from 'class-validator';
import { VALIDATION_PATTERNS } from '../../../common/constants';
import { EmailTransform } from '../../../common/pipes';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Matches(VALIDATION_PATTERNS.FIRSTNAME)
  @ApiProperty({ required: true, type: String })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Matches(VALIDATION_PATTERNS.LASTNAME)
  @ApiProperty({ required: true, type: String })
  lastName: string;

  @IsEmail()
  @Matches(VALIDATION_PATTERNS.EMAIL)
  @ApiProperty({ required: true, type: String })
  @Transform((t: TransformFnParams) => new EmailTransform().transform(t.value))
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty({ required: true, type: String })
  phone: string;
}
