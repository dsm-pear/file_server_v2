import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notice_file_tbl')
export class NoticeFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  path: string;

  @Column()
  notice_id: number;
}
