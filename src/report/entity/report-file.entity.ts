import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('report_file_tbl')
export class ReportFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  path: string;

  @Column()
  report_id: number;

  @Column({ length: 50, nullable: true })
  filename: string;
}
