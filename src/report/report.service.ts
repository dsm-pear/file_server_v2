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
    const reportFiles = await this.reportRepository.find({ report: id });
    if (reportFiles.length === 0) throw FileNotFoundException;

    return reportFiles;
  }

  public async downloadFile(id: number): Promise<string> {
    const reportFile = await this.isExistFile(id);

    return reportFile.path;
  }

  public async modifyFile(filename: string, id: number): Promise<ReportFile> {
    const reportFile = await this.isExistFile(id);
    return await this.reportRepository.modifyFile(filename, reportFile);
  }

  private async isExistFile(id: number): Promise<ReportFile> {
    const reportFile = await this.reportRepository.findOne({ id });
    console.log(reportFile);
    if (!reportFile) throw FileNotFoundException;
    return reportFile;
  }
}
