import { ReportFile } from 'src/report/entity/report-file.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from '../member/member.entity';

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

  @Column({ length: 100, nullable: true })
  comment: string;

  @Column({ length: 100, nullable: true })
  github: string;

  @Column({ length: 100, nullable: true })
  team_name: string;

  @OneToMany(() => Member, (member) => member.report)
  members: Member[];

  @OneToOne(() => ReportFile, (reportFile) => reportFile.report)
  reportFile: ReportFile;
}
