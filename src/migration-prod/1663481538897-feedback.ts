import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class feedback1663481538897 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'feedback',
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
            name: 'store_id',
            type: 'varchar',
            length: '12',
          },
          {
            name: 'feedback',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'varchar',
            length: '40',
            default: `left(NOW(),19)`,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('feedback');
  }
}
