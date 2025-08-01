import { Entity, Column, Index } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../base';

@Entity()
export class User extends BaseEntity {
  @ApiProperty({
    type: String,
    default: 'test@example.com',
  })
  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  @ApiProperty({
    description: 'Phone number',
    type: 'string',
    maxLength: 255,
    nullable: true,
  })
  phone: string;

  @ApiProperty({
    type: String,
    default: 'Stella',
  })
  @Column({
    name: 'first_name',
  })
  @Index()
  firstName: string;

  @ApiProperty({
    type: String,
    default: 'Yanyan',
  })
  @Column({
    name: 'last_name',
  })
  @Index()
  lastName: string;
}
