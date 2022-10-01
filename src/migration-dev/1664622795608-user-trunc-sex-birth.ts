import { MigrationInterface, QueryRunner } from 'typeorm';

export class userTruncSexBirth1664622795608 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        update user set sex = '', birth = ''
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
