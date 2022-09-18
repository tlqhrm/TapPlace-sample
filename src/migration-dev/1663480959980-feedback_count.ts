import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class feedbackCount1663480959980 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'feedback_count',
        columns: [
          {
            name: 'num',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'count',
            type: 'int',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('feedback_count');
  }
}
