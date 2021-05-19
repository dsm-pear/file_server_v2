import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}
