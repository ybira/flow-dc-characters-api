import { ApiProperty } from '@nestjs/swagger';

export class PagedMetadata {
  @ApiProperty()
  totalDocument: number;

  @ApiProperty()
  pages: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  pagePer: number;

  constructor(page: number, total: number, pagePer: number) {
    this.page = page ? page : 1;
    this.totalDocument = total;
    this.pagePer = pagePer ? pagePer : 5;
    this.pages = Math.ceil(this.totalDocument / this.pagePer);
  }
}

export class PagedResponse<T> {
  @ApiProperty({isArray: true, type: Object})
  embedded: T[];

  @ApiProperty()
  metadata: PagedMetadata;

  constructor(page: number, total: number, pagePer: number, data: T[]) {
    this.embedded = data;
    this.metadata = new PagedMetadata(page, total, pagePer);
  }
}

