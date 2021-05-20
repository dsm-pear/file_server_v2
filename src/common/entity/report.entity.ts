import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('report_tbl')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  description: string;

  @Column({ length: 100 })
  title: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'tinyint' })
  is_accepted: number;

  @Column({ type: 'tinyint' })
  is_submitted: number;

  @Column({ length: 100 })
  comment: string;

  @Column({ length: 100 })
  github: string;

  @Column({ length: 100 })
  team_name: string;
}
