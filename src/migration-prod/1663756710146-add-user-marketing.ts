import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addUserMarketing1663756710146 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('user', [
      new TableColumn({
        name: 'marketing_date',
        type: 'varchar',
        length: '40',
      }),
      new TableColumn({
        name: 'marketing_agree',
        type: 'boolean',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('user', [
      'marketing_date',
      'marketing_agree',
    ]);
  }
}
