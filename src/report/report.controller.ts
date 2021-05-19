import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { MulterConfigs } from 'src/config/multer';
import { ReportFile } from './entity/report-file.entity';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('reportFile', MulterConfigs))
  @Post('file/:report_id')
  public async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('report_id') id: number,
  ): Promise<ReportFile> {
    return await this.reportService.uploadFile(file.filename, id);
  }
}
