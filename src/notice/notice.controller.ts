import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { basename } from 'path';
import { FileNotFoundException } from 'src/common/exception/exception.index';
import { MulterConfigs } from '../config/multer';
import { NoticeFile } from './entity/notice-file.entity';
import { NoticeService } from './notice.service';
import { getType } from 'mime';
import { decode, encode } from 'iconv-lite';
import { DeleteResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

@Controller('notice')
export class NoticeController {
  constructor(private noticeService: NoticeService) {}

  @UseGuards(AuthGuard('admin-jwt'))
  @UseInterceptors(FileInterceptor('noticeFile', MulterConfigs))
  @Post('file/:notice_id')
  public async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('notice_id') id: number,
  ): Promise<NoticeFile> {
    return await this.noticeService.uploadFile(file.filename, id);
  }

  @Get('files/:notice_id')
  public async getNoticeFiles(
    @Param('notice_id') id: number,
  ): Promise<NoticeFile[]> {
    return await this.noticeService.getNoticeFiles(id);
  }

  @Get(':file_id')
  public async downloadFile(
    @Param('file_id') id: number,
    @Res() res: Response,
  ): Promise<void> {
    const noticefilePath = await this.noticeService.downloadFile(id);
    const filepath = `${process.cwd()}/upload/noticeFile/${noticefilePath}`;
    const filename = basename(filepath);
    const mimetype = getType(filepath);
    console.log(filename, mimetype, filepath);

    if (!existsSync(filepath)) throw FileNotFoundException;

    res.setHeader(
      'Content-disposition',
      'attachment; filename=' + decode(encode(filename, 'UTF-8'), 'ISO-8859-1'),
    );
    res.setHeader('Content-type', mimetype);

    let filestream = createReadStream(filepath);
    filestream.pipe(res);
  }

  @UseGuards(AuthGuard('admin-jwt'))
  @UseInterceptors(FileInterceptor('noticeFile', MulterConfigs))
  @Put(':file_id')
  public async modifyFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('file_id') id: number,
  ): Promise<NoticeFile> {
    return await this.noticeService.modifyFile(file.filename, id);
  }

  @UseGuards(AuthGuard('admin-jwt'))
  @Delete(':file_id')
  public async deleteFile(@Param('file_id') id: number): Promise<DeleteResult> {
    return await this.noticeService.deleteFile(id);
  }
}
