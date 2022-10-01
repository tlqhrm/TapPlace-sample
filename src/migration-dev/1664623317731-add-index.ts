import { MigrationInterface, QueryRunner } from 'typeorm';

export class addIndex1664623317731 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `alter table bookmark add index idx (user_id, store_id)`,
    );

    await queryRunner.query(
      `alter table feedback add index idx (user_id, store_id)`,
    );

    await queryRunner.query(
      `alter table feedback_count add index idx (user_id)`,
    );

    await queryRunner.query(`alter table user_log add index idx (user_id)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
