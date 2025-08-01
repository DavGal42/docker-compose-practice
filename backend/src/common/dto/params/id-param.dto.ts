import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class IdParamDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
}
