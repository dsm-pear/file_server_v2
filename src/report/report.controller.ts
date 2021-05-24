import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { encode, decode } from 'iconv-lite';
import { getType } from 'mime';
import { basename } from 'path';
import { FileNotFoundException } from 'src/common/exception/exception.index';
import { MulterConfigs } from 'src/config/multer';
import { DeleteResult } from 'typeorm';
import { ReportFile } from './entity/report-file.entity';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('reportFile', MulterConfigs))
  @Post('file/:report_id')
  public async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('report_id') id: number,
  ): Promise<ReportFile> {
    return await this.reportService.uploadFile(file.filename, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('files/:report_id')
  public async getReportFiles(
    @Param('report_id') id: number,
  ): Promise<ReportFile[]> {
    return await this.reportService.getReportFiles(id);
  }

  @Get(':file_id')
  public async downloadFile(
    @Param('file_id') id: number,
    @Query('token') token: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.reportService.verifyTokenQuery(token);
    const reportfilePath = await this.reportService.downloadFile(id);
    const filepath = `${process.cwd()}/upload/reportFiles/${reportfilePath}`;
    const filename = basename(filepath);
    const mimetype = getType(filepath);

    if (!existsSync(filepath)) throw FileNotFoundException;

    res.setHeader(
      'Content-disposition',
      'attachment; filename=' + decode(encode(filename, 'UTF-8'), 'ISO-8859-1'),
    );
    res.setHeader('Content-type', mimetype);

    let filestream = createReadStream(filepath);
    filestream.pipe(res);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('reportFile', MulterConfigs))
  @Put(':file_id')
  public async modifyFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('file_id') id: number,
  ): Promise<ReportFile> {
    return await this.reportService.modifyFile(file.filename, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':file_id')
  public async deleteFile(@Param('file_id') id: number): Promise<DeleteResult> {
    return await this.reportService.deleteFile(id);
  }
}
