import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Report } from '../../common/entity/report.entity';

@Entity('report_file_tbl')
export class ReportFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  path: string;

  @Column({ length: 50, nullable: true })
  filename: string;

  @OneToOne(() => Report)
  @JoinColumn({ name: 'report_id' })
  report: number;
}
