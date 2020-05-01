import { Address } from '@api/database/entities/address.entity';
import { DatabaseEntity } from '@api/database/entities/database.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

export enum Alignment {
  GOOD = 'good',
  BAD = 'bad',
}

@Entity()
export class Character extends DatabaseEntity {
  @Column({
    type: String,
    length: 100,
    unique: true,
  })
  public name: string;

  @Column({
    type: String,
    length: 100,
  })
  public affiliation: string;

  @Column({
    type: 'enum',
    enum: Alignment,
  })
  public alignment: Alignment;

  @OneToOne(() => Address, {
    cascade: true,
    eager: true,
    nullable: false,
  })
  @JoinColumn()
  public address: Address;

  @Column({
    type: String,
    length: 200,
  })
  public skills: string;
}
