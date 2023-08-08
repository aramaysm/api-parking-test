import { MigrationInterface, QueryRunner } from 'typeorm';

export class MainEntitiesCreatedFinish1691507340729
  implements MigrationInterface
{
  name = 'MainEntitiesCreatedFinish1691507340729';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tb_parking_slots" DROP CONSTRAINT "FK_1797eef47568af815c8ebef45d1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_parking_slots" RENAME COLUMN "categoryVehicleId" TO "categoryId"`,
    );
    await queryRunner.query(
      `CREATE TABLE "tb_customers" ("id" SERIAL NOT NULL, "dni" character varying(11) NOT NULL, "payment_card" character varying(20) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "UQ_dadf726076d1a27057e7c7b0dd2" UNIQUE ("dni"), CONSTRAINT "PK_366d9a272614a95e2fae367af28" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tb_vehicles" ("id" SERIAL NOT NULL, "plate" character varying(10) NOT NULL, "description" character varying(250) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" integer, "ownerId" integer, CONSTRAINT "UQ_b50b93aa15f4b990e583f4b43c4" UNIQUE ("plate"), CONSTRAINT "PK_c46e3ac437cc1d1e3ef8048a33b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tb_reservations" ("id" SERIAL NOT NULL, "start_timestamp" TIMESTAMP NOT NULL DEFAULT now(), "duration_in_minutes" integer NOT NULL, "status" character varying(10) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "parkingSlotId" integer, "vehicleId" integer, CONSTRAINT "PK_84ba57fad4e824500de8f02d6f0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_customers" ADD CONSTRAINT "FK_ef52c0166921e9fdc07bc2f8cf7" FOREIGN KEY ("userId") REFERENCES "tb_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_vehicles" ADD CONSTRAINT "FK_033e733f94459337b549a486d3f" FOREIGN KEY ("categoryId") REFERENCES "tb_vehicle_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_vehicles" ADD CONSTRAINT "FK_449672e4ee9bf78b2ef5027c7c9" FOREIGN KEY ("ownerId") REFERENCES "tb_customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_reservations" ADD CONSTRAINT "FK_a945277f773a0ac5891e5a12be6" FOREIGN KEY ("parkingSlotId") REFERENCES "tb_parking_slots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_reservations" ADD CONSTRAINT "FK_17753ba59543c2b817461c8bd12" FOREIGN KEY ("vehicleId") REFERENCES "tb_vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_parking_slots" ADD CONSTRAINT "FK_da47887d651da644a92924a9055" FOREIGN KEY ("categoryId") REFERENCES "tb_vehicle_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tb_parking_slots" DROP CONSTRAINT "FK_da47887d651da644a92924a9055"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_reservations" DROP CONSTRAINT "FK_17753ba59543c2b817461c8bd12"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_reservations" DROP CONSTRAINT "FK_a945277f773a0ac5891e5a12be6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_vehicles" DROP CONSTRAINT "FK_449672e4ee9bf78b2ef5027c7c9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_vehicles" DROP CONSTRAINT "FK_033e733f94459337b549a486d3f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_customers" DROP CONSTRAINT "FK_ef52c0166921e9fdc07bc2f8cf7"`,
    );
    await queryRunner.query(`DROP TABLE "tb_reservations"`);
    await queryRunner.query(`DROP TABLE "tb_vehicles"`);
    await queryRunner.query(`DROP TABLE "tb_customers"`);
    await queryRunner.query(
      `ALTER TABLE "tb_parking_slots" RENAME COLUMN "categoryId" TO "categoryVehicleId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_parking_slots" ADD CONSTRAINT "FK_1797eef47568af815c8ebef45d1" FOREIGN KEY ("categoryVehicleId") REFERENCES "tb_vehicle_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
