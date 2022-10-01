import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addUsersTerms1663460566742 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('user', [
      new TableColumn({
        name: 'personal_date',
        type: 'varchar',
        length: '40',
      }),
      new TableColumn({
        name: 'service_date',
        type: 'varchar',
        length: '40',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('user', ['personal_date', 'service_date']);
  }
}
