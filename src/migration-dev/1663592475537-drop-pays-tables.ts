import { MigrationInterface, QueryRunner } from 'typeorm';

export class dropPaysTables1663592475537 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('kakaopay');
    await queryRunner.dropTable('naverpay');
    await queryRunner.dropTable('zeropay');
    await queryRunner.dropTable('payco');
    await queryRunner.dropTable('toss');
    await queryRunner.dropTable('apple_visa');
    await queryRunner.dropTable('apple_master');
    await queryRunner.dropTable('apple_jcb');
    await queryRunner.dropTable('conless_amex');
    await queryRunner.dropTable('conless_jcb');
    await queryRunner.dropTable('conless_master');
    await queryRunner.dropTable('conless_union');
    await queryRunner.dropTable('conless_visa');
    await queryRunner.dropTable('google_maestro');
    await queryRunner.dropTable('google_master');
    await queryRunner.dropTable('google_visa');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropTable('kakaopay');
    // await queryRunner.dropTable('naverpay');
    // await queryRunner.dropTable('zeropay');
    // await queryRunner.dropTable('payco');
    // await queryRunner.dropTable('toss');
    // await queryRunner.dropTable('apple_visa');
    // await queryRunner.dropTable('apple_master');
    // await queryRunner.dropTable('apple_jcb');
    // await queryRunner.dropTable('conless_amex');
    // await queryRunner.dropTable('conless_jcb');
    // await queryRunner.dropTable('conless_master');
    // await queryRunner.dropTable('conless_union');
    // await queryRunner.dropTable('conless_visa');
    // await queryRunner.dropTable('google_maestro');
    // await queryRunner.dropTable('google_master');
    // await queryRunner.dropTable('google_visa');
  }
}
