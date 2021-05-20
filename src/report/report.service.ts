import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileNotFoundException } from 'src/common/exception/exception.index';
import { ReportFile } from './entity/report-file.entity';
import { ReportFileRepository } from './entity/report-file.repository';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReportFile)
    private readonly reportRepository: ReportFileRepository,
  ) {}

  public async uploadFile(filename: string, id: number): Promise<ReportFile> {
    return await this.reportRepository.uploadFile(filename, id);
  }

  public async getReportFiles(id: number): Promise<ReportFile[]> {
    const reportFiles = await this.reportRepository.find({ report_id: id });
    if (reportFiles.length === 0) throw FileNotFoundException;

    return reportFiles;
  }
}
