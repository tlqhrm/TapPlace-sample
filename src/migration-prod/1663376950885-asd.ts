import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class asd1663376950885 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query('alter table "user" add "token" varchar(200)');
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'token',
        type: 'varchar',
        length: '200',
        default: `''`,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'token');
  }
}
