import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1659319822368 implements MigrationInterface {
  name = 'init1659319822368';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "name" TO "username"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "username" TO "name"`,
    );
  }
}
