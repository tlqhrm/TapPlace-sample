import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTable1659324993239 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE actors (
        actor_id SERIAL PRIMARY KEY, 
        first_name VARCHAR(150),
        last_name VARCHAR(150) NOT NULL,
        gender CHAR(1),
        date_of_birth DATE,
        add_date DATE,
        update_date Date
    )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table actors`);
  }
}
