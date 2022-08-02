import { MigrationInterface, QueryRunner } from 'typeorm';

export class test31659397403808 implements MigrationInterface {
  name = 'test31659397403808';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "wordpass" TO "password"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "password" TO "wordpass"`,
    );
  }
}
