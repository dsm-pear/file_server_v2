import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/common/entity/member/member.entity';
import { Report } from 'src/common/entity/report/report.entity';
import { ReportRepository } from 'src/common/entity/report/report.repository';
import {
  FileNotFoundException,
  ReportNotFoundException,
  UserForbiddenException,
} from 'src/common/exception/exception.index';
import { ReportFile } from './entity/report-file.entity';
import { ReportFileRepository } from './entity/report-file.repository';
import { MemberRepository } from '../common/entity/member/member.repository';
import { REQUEST } from '@nestjs/core';
import { IUserReqeust } from 'src/common/interface/IUserRequest';
import { DeleteResult } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class ReportService {
  constructor(
    @InjectRepository(ReportFile)
    private readonly reportFileRepository: ReportFileRepository,
    @InjectRepository(Report)
    private readonly reportRepository: ReportRepository,
    @InjectRepository(Member)
    private readonly memberRepository: MemberRepository,
    @Inject(REQUEST) private request: IUserReqeust,
  ) {}

  public async uploadFile(filename: string, id: number): Promise<ReportFile> {
    const reportRecord = await this.reportRepository.findReportByReportId(id);
    if (!reportRecord) throw ReportNotFoundException;
    return await this.reportFileRepository.uploadFile(filename, id);
  }

  public async getReportFiles(id: number): Promise<ReportFile[]> {
    const reportFiles = await this.reportFileRepository.find({ report: id });
    if (reportFiles.length === 0) throw FileNotFoundException;

    return reportFiles;
  }

  public async downloadFile(id: number): Promise<string> {
    const reportFile = await this.isExistFile(id);

    return reportFile.path;
  }

  public async modifyFile(filename: string, id: number): Promise<ReportFile> {
    const reportFile = await this.isExistFile(id);
    const ownMember = await this.isOwnMember(id);

    if (!ownMember) throw UserForbiddenException;
    return await this.reportFileRepository.modifyFile(filename, reportFile);
  }

  public async deleteFile(id: number): Promise<DeleteResult> {
    const reportFile = await this.isExistFile(id);
    const ownMember = await this.isOwnMember(id);

    if (!ownMember) throw UserForbiddenException;
    return await this.reportFileRepository.delete(reportFile);
  }

  private async isExistFile(id: number): Promise<ReportFile> {
    const reportFile = await this.reportFileRepository.findOne({ id });
    if (!reportFile) throw FileNotFoundException;
    return reportFile;
  }

  private async isOwnMember(id: number): Promise<boolean> {
    const memberRecord = await this.memberRepository.findMemberById(id);
    for (let i = 0; i < memberRecord.length; i++) {
      if (memberRecord[i].user_email == this.request.user.sub) {
        return true;
      }
    }
    return false;
  }
}
