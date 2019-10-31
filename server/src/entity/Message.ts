import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm';

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  senderId: number;

  @Column('varchar')
  sender: string;

  @Column('varchar')
  senderAvatar: string;

  @Column('text', { nullable: false })
  msg: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
