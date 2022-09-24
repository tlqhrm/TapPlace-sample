import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class qnaAddStoreIdAnswer1664009711241 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('qna', [
      new TableColumn({
        name: 'store_id',
        type: 'varchar',
        length: '12',
      }),
      new TableColumn({
        name: 'answer',
        type: 'text',
        isNullable: true,
      }),
    ]);
    await queryRunner.query(`alter table qna add index idx_user_id (user_id)`);
    await queryRunner.query(
      `alter table qna add index idx_admin (category,answer_check)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('qna', ['store_id', 'answer']);
    await queryRunner.dropIndex('qna', 'idx_user_id');
    await queryRunner.dropIndex('qna', 'idx_admin');
  }
}
