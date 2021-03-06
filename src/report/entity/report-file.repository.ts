import { Member } from 'src/common/entity/member/member.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ReportFile } from './report-file.entity';

@EntityRepository(ReportFile)
export class ReportFileRepository extends Repository<ReportFile> {
  public async uploadFile(filename: string, id: number): Promise<ReportFile> {
    let newReportFile: ReportFile;
    newReportFile = this.create({
      path: filename,
      report: id,
    });
    return await this.save(newReportFile);
  }

  public async modifyFile(
    filename: string,
    reportFile: ReportFile,
  ): Promise<ReportFile> {
    reportFile.path = filename;
    return await this.save(reportFile);
  }
}
