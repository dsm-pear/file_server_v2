import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileNotFoundException } from 'src/common/exception/exception.index';
import { ReportFile } from 'src/report/entity/report-file.entity';
import { ReportFileRepository } from 'src/report/entity/report-file.repository';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ReportFile)
    private readonly reportFileRepository: ReportFileRepository,
  ) {}

  public async getReportFileByIds(ids: number[]): Promise<ReportFile[]> {
    let reportFiles: ReportFile[] = [];
    for (let i = 0; i < ids.length; i++) {
      let reportFileRecord: ReportFile = await this.reportFileRepository.findOne(
        { id: ids[i] },
      );

      if (!reportFileRecord) throw FileNotFoundException;
      reportFiles.push(reportFileRecord);
    }

    return reportFiles;
  }
}
