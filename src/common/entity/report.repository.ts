import { EntityRepository, Repository } from 'typeorm';
import { Report } from './report.entity';

@EntityRepository(Report)
export class ReportRepository extends Repository<Report> {
  public async findReportByReportId(id: number): Promise<Report> {
    return await this.findOne({ id });
  }
}
