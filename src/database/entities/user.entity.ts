import { DatabaseEntity } from '@api/database/entities/database.entity';
import { Column, Entity } from 'typeorm';

export enum Role {
  EDITOR = 'EDITOR',
  ADMIN = 'ADMIN',
  READER = 'READER',
}

@Entity()
export class User extends DatabaseEntity {

  @Column({
    length: 60,
  })
  public firstName: string;

  @Column({
    length: 60,
  })
  public lastName: string;

  @Column({
    length: 100,
    unique: true,
  })
  public email: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  public role: string;

  @Column({
    length: 100
  })
  public password: string;
}
