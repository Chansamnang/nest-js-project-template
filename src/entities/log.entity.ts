import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('log')
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  method: string;

  @Column({ type: 'text', nullable: true })
  url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  hostname: string;

  @Column({ type: 'text', nullable: true })
  request_body: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  status_code: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ip_address: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  platform: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  user_agent: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  requested_by: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  created_at: Date;
}
