import { DatabaseEntity } from '@api/database/entities/database.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Address extends DatabaseEntity {
  @Column({
    length: 100,
  })
  public planet: string;

  @Column({
    length: 100,
  })
  public city: string;
}
