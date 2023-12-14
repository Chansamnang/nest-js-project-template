import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Session } from './session.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  status: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];
}
