import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty, IsString } from 'class-validator';

export class DeleteBookmarkDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '123550e8400-e29b-41d4-a716-446655440000',
    description: '유저 고유 UUID',
  })
  user_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '123123123',
    description: '스토어 ID',
  })
  store_id: string;

  @Allow()
  @ApiProperty({
    example: '',
    description: 'API KEY',
  })
  key: string;
}
