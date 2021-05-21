import { Member } from 'src/common/entity/member/member.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Member)
export class MemberRepository extends Repository<Member> {
  public async findMemberById(id: number) {
    const memberRecord = await this.createQueryBuilder('member')
      .leftJoin('member.report', 'report')
      .leftJoin('report.reportFile', 'reportFile')
      .select('member.user_email')
      .where('reportFile.id = :id', { id })
      .getMany();

    return memberRecord;
  }
}
