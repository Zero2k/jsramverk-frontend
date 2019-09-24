import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true })
  username: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar')
  password: string;

  @Column('varchar', { nullable: true })
  birthday: string;

  @Column('varchar', { nullable: true })
  resetPasswordToken: string | null;

  @Column('bigint', { nullable: true })
  resetPasswordExpires: number | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
