import { MigrationInterface, QueryRunner } from 'typeorm';

export class test1659320302385 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "password" TO "wordpass"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "wordpass" TO "password"`,
    );
  }
}
