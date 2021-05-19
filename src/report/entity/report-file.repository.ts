import { EntityRepository, Repository } from 'typeorm';
import { ReportFile } from './report-file.entity';

@EntityRepository(ReportFile)
export class ReportFileRepository extends Repository<ReportFile> {
  public async uploadFile(filename: string, id: number): Promise<ReportFile> {
    let newReportFile: ReportFile;
    newReportFile = this.create({
      path: filename,
      report_id: id,
    });
    return await this.save(newReportFile);
  }
}
