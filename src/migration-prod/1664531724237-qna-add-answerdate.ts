import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class qnaAddAnswerdate1664531724237 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('qna', [
      new TableColumn({
        name: 'answer_date',
        type: 'varchar',
        length: '40',
        default: `''`,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('qna', 'answer_date');
  }
}
