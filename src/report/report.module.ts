import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberRepository } from 'src/common/entity/member/member.repository';
import { ReportRepository } from 'src/common/entity/report/report.repository';
import { ReportFileRepository } from './entity/report-file.repository';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReportFileRepository,
      ReportRepository,
      MemberRepository,
    ]),
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
