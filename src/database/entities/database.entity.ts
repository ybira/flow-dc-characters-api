import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class DatabaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn({type: 'timestamp'})
  public createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  public updatedAt: Date;
}
