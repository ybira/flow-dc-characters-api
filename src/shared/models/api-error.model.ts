import { ApiProperty } from '@nestjs/swagger';

export class ApiError {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string[];
}
