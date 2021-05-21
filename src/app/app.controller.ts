import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as AdmZip from 'adm-zip';
import { Response } from 'express';
import { ReportFilesBadQueryException } from 'src/common/exception/exception.index';
import { ReportFile } from 'src/report/entity/report-file.entity';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @UseGuards(AuthGuard('admin-jwt'))
  @Get('files')
  public async downloadZipFiles(
    @Query('report_id') report_id: number[],
    @Res() res: Response,
  ): Promise<void> {
    let zip = new AdmZip();
    if (!Array.isArray(report_id)) throw ReportFilesBadQueryException;

    let reportFiles: ReportFile[] = await this.appService.getReportFileByIds(
      report_id,
    );
    for (let i = 0; i < report_id.length; i++) {
      zip.addLocalFile(
        `${process.cwd()}/upload/reportFiles/${reportFiles[i].path}`,
      );
    }

    let downloadName = `${Date.now()}.zip`;
    let data = zip.toBuffer();
    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Disposition', `attachment; filename=${downloadName}`);
    res.set('Content-Length', data.length.toString());
    res.send(data);
  }
}
