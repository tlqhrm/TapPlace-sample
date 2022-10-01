import { MigrationInterface, QueryRunner } from 'typeorm';

export class qnaDeleteEmail1664331936463 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('qna', 'email');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
