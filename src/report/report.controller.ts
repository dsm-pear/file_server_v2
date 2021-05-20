import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterConfigs } from 'src/config/multer';
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
}
