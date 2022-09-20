import { MigrationInterface, QueryRunner } from 'typeorm';

export class addPayTable1663592434782 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE pay (
            num int(11) NOT NULL AUTO_INCREMENT,
            store_id varchar(12) NOT NULL,
            success int(11) NOT NULL DEFAULT 0,
            fail int(11) NOT NULL DEFAULT 0,
            last_state varchar(10) NOT NULL DEFAULT '',
            last_time varchar(40) NOT NULL DEFAULT '',
            pay varchar(40) NOT NULL,
            PRIMARY KEY (num),
            KEY idx (store_id)
          )
        `);

    await queryRunner.query(`
    INSERT into pay(store_id ,success ,fail ,last_state ,last_time,pay) (select store_id ,success ,fail ,last_state ,last_time ,'naverpay' from naverpay)
    `);
    await queryRunner.query(`INSERT into pay(store_id ,success ,fail ,last_state ,last_time,pay) (select store_id ,success ,fail ,last_state ,last_time ,'kakaopay' from kakaopay);
    `);
    await queryRunner.query(`INSERT into pay(store_id ,success ,fail ,last_state ,last_time,pay) select store_id ,success ,fail ,last_state ,last_time ,'payco' from payco;
    `);
    await queryRunner.query(`INSERT into pay(store_id ,success ,fail ,last_state ,last_time,pay) select store_id ,success ,fail ,last_state ,last_time ,'zeropay' from zeropay;
    `);
    await queryRunner.query(`INSERT into pay(store_id ,success ,fail ,last_state ,last_time,pay) select store_id ,success ,fail ,last_state ,last_time ,'apple_jcb' from apple_jcb;
    `);
    await queryRunner.query(`INSERT into pay(store_id ,success ,fail ,last_state ,last_time,pay) select store_id ,success ,fail ,last_state ,last_time ,'apple_master' from apple_master;
    `);
    await queryRunner.query(`INSERT into pay(store_id ,success ,fail ,last_state ,last_time,pay) select store_id ,success ,fail ,last_state ,last_time ,'apple_visa' from apple_visa;
    `);
    await queryRunner.query(`INSERT into pay(store_id ,success ,fail ,last_state ,last_time,pay) select store_id ,success ,fail ,last_state ,last_time ,'conless_amex' from conless_amex;
    `);
    await queryRunner.query(`INSERT into pay(store_id ,success ,fail ,last_state ,last_time,pay) select store_id ,success ,fail ,last_state ,last_time ,'conless_jcb' from conless_jcb;
    `);
    await queryRunner.query(`INSERT into pay(store_id ,success ,fail ,last_state ,last_time,pay) select store_id ,success ,fail ,last_state ,last_time ,'conless_master' from conless_master;
    `);
    await queryRunner.query(`INSERT into pay(store_id ,success ,fail ,last_state ,last_time,pay) select store_id ,success ,fail ,last_state ,last_time ,'conless_union' from conless_union;
    `);
    await queryRunner.query(`INSERT into pay(store_id ,success ,fail ,last_state ,last_time,pay) select store_id ,success ,fail ,last_state ,last_time ,'conless_visa' from conless_visa;
    `);
    await queryRunner.query(`INSERT into pay(store_id ,success ,fail ,last_state ,last_time,pay) select store_id ,success ,fail ,last_state ,last_time ,'google_maestro' from google_maestro;
    `);
    await queryRunner.query(`INSERT into pay(store_id ,success ,fail ,last_state ,last_time,pay) select store_id ,success ,fail ,last_state ,last_time ,'google_master' from google_master;
    `);
    await queryRunner.query(`INSERT into pay(store_id ,success ,fail ,last_state ,last_time,pay) select store_id ,success ,fail ,last_state ,last_time ,'google_visa' from google_visa;
    `);
    await queryRunner.query(`INSERT into pay(store_id ,success ,fail ,last_state ,last_time,pay) select store_id ,success ,fail ,last_state ,last_time ,'toss' from toss;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pay');
  }
}
