import { EntityRepository, Repository } from 'typeorm';
import { Report } from './report.entity';

@EntityRepository(Report)
export class ReportRepository extends Repository<Report> {
  public async findReportByReportId(id: number): Promise<Report> {
    return await this.findOne({ id });
  }

  public async findReportByFileId(id: number): Promise<Report> {
    return await this.createQueryBuilder('report')
      .select('report.id', 'report_id')
      .innerJoin('report.reportFile', 'reportFile')
      .where('reportFile.id = :id', { id })
      .getOne();
  }
}
