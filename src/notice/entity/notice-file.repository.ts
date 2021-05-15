import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { NoticeFile } from './notice-file.entity';

@EntityRepository(NoticeFile)
export class NoticeFileRepository extends Repository<NoticeFile> {
  public async uploadFile(filename: string, id: number): Promise<NoticeFile> {
    let newNoticeFile: NoticeFile;
    newNoticeFile = this.create({
      path: filename,
      notice_id: id,
    });
    return await this.save(newNoticeFile);
  }

  public async modifyFile(
    filename: string,
    noticeFile: NoticeFile,
  ): Promise<NoticeFile> {
    noticeFile.path = filename;
    return await this.save(noticeFile);
  }
}
