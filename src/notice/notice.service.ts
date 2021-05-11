import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}
