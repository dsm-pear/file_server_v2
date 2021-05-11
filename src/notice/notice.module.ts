import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeFileRepository } from './entity/notice-file.repository';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';

@Module({
  imports: [TypeOrmModule.forFeature([NoticeFileRepository])],
  controllers: [NoticeController],
  providers: [NoticeService],
})
export class NoticeModule {}
