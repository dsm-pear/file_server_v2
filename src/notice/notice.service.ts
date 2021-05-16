import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileNotFoundException } from 'src/common/exception/exception.index';
import { DeleteResult, UpdateResult } from 'typeorm';
import { NoticeFile } from './entity/notice-file.entity';
import { NoticeFileRepository } from './entity/notice-file.repository';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(NoticeFile)
    private readonly noticeFileRepository: NoticeFileRepository,
  ) {}

  public async uploadFile(filename: string, id: number): Promise<NoticeFile> {
    return await this.noticeFileRepository.uploadFile(filename, id);
  }

  public async getNoticeFiles(id: number): Promise<NoticeFile[]> {
    const noticeFiles = await this.noticeFileRepository.find({ notice_id: id });
    if (noticeFiles.length === 0) throw FileNotFoundException;

    return noticeFiles;
  }

  public async downloadFile(id: number): Promise<string> {
    const noticeFile = await this.isExistFile(id);

    return noticeFile.path;
  }

  public async modifyFile(filename: string, id: number): Promise<NoticeFile> {
    const noticeFile = await this.isExistFile(id);
    return await this.noticeFileRepository.modifyFile(filename, noticeFile);
  }

  public async deleteFile(id: number): Promise<DeleteResult> {
    const noticeFile = await this.isExistFile(id);
    return await this.noticeFileRepository.delete(noticeFile);
  }

  private async isExistFile(id: number): Promise<NoticeFile> {
    const noticeFile = await this.noticeFileRepository.findOne({ id });
    if (!noticeFile) throw FileNotFoundException;
    return noticeFile;
  }
}
