import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCarUseTable1661230755901 implements MigrationInterface {
  name = 'CreateCarUseTable1661230755901';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "car_use" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "end_date" TIMESTAMP, "reason" character varying NOT NULL, "car_id" uuid NOT NULL, "driver_id" uuid NOT NULL, CONSTRAINT "REL_f9bfdbac3db07dc3eaa37048b0" UNIQUE ("car_id"), CONSTRAINT "REL_82ec614e00ba97af054b19595f" UNIQUE ("driver_id"), CONSTRAINT "PK_b996b554a8aa80c09a210c0e6b1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_use" ADD CONSTRAINT "FK_f9bfdbac3db07dc3eaa37048b00" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_use" ADD CONSTRAINT "FK_82ec614e00ba97af054b19595f6" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car_use" DROP CONSTRAINT "FK_82ec614e00ba97af054b19595f6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "car_use" DROP CONSTRAINT "FK_f9bfdbac3db07dc3eaa37048b00"`,
    );
    await queryRunner.query(`DROP TABLE "car_use"`);
  }
}
