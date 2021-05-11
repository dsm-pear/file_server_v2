import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../common/guard/jwt-auth.guard';
import { MulterConfigs } from '../config/multer';
import { NoticeFile } from './entity/notice-file.entity';
import { NoticeService } from './notice.service';

@Controller('notice')
export class NoticeController {
  constructor(private noticeService: NoticeService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('noticeFile', MulterConfigs))
  @Post('file/:notice_id')
  public async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('notice_id') id: number,
  ): Promise<NoticeFile> {
    return await this.noticeService.uploadFile(file.filename, id);
  }
}
