import { EntityRepository, Repository } from 'typeorm';
import { NoticeFile } from './notice-file.entity';

@EntityRepository(NoticeFile)
export class NoticeFileRepository extends Repository<NoticeFile> {
  public async uploadFile(filename: string, id: number) {
    let newNoticeFile: NoticeFile;
    newNoticeFile = this.create({
      path: filename,
      notice_id: id,
    });
    return await this.save(newNoticeFile);
  }
}
