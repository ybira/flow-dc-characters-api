import { ApiProperty } from '@nestjs/swagger';

export class Refresh {
  @ApiProperty()
  refreshToken: string;
}
