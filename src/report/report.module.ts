import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportFileRepository } from './entity/report-file.repository';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReportFileRepository])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
