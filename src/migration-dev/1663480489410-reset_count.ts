import { MigrationInterface, QueryRunner } from 'typeorm';

export class resetCount1663480489410 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SET GLOBAL event_scheduler = ON`);
    await queryRunner.query(
      `CREATE EVENT count_reset
                ON SCHEDULE EVERY 1 DAY 
                STARTS '2022-09-18 23:59:59'
                COMMENT 'feedback_count 삭제'
                DO
                TRUNCATE TABLE dev.feedback_count`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP event count_reset;
    `);
  }
}
