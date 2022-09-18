import { MigrationInterface, QueryRunner } from 'typeorm';

export class userDefault1663490947198 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`alter table user alter column sex set default ''`);
    queryRunner.query(`alter table user alter column birth set default ''`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`alter table user alter column sex set drop default`);
    queryRunner.query(`alter table user alter column birth set drop default`);
  }
}
