import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Report } from '../report/report.entity';

@Entity('member_tbl')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_email: string;

  @ManyToOne(() => Report, (report) => report.members)
  @JoinColumn({ name: 'report_id' })
  report: number;
}
