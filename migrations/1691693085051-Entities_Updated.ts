import { MigrationInterface, QueryRunner } from "typeorm";

export class EntitiesUpdated1691693085051 implements MigrationInterface {
    name = 'EntitiesUpdated1691693085051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_reservations" RENAME COLUMN "duration_in_minutes" TO "end_timestamp"`);
        await queryRunner.query(`ALTER TABLE "tb_parking_slots" DROP CONSTRAINT "UQ_d24bc1f342e8dce7450979cbea4"`);
        await queryRunner.query(`ALTER TABLE "tb_parking_slots" DROP COLUMN "slot_number"`);
        await queryRunner.query(`ALTER TABLE "tb_users" ADD "fullname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_users" ADD "email" character varying(65) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_users" ADD "phone" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_customers" ADD "status" character varying NOT NULL DEFAULT 'Activo'`);
        await queryRunner.query(`ALTER TABLE "tb_vehicles" ADD "status" character varying NOT NULL DEFAULT 'Activo'`);
        await queryRunner.query(`ALTER TABLE "tb_blocks" ADD "status" character varying NOT NULL DEFAULT 'Activo'`);
        await queryRunner.query(`ALTER TABLE "tb_parking_slots" ADD "slot_code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_parking_slots" ADD CONSTRAINT "UQ_eb5d74a1326e3081fda056b79d6" UNIQUE ("slot_code")`);
        await queryRunner.query(`ALTER TABLE "tb_parking_slots" ADD "status" character varying NOT NULL DEFAULT 'Activo'`);
        await queryRunner.query(`ALTER TABLE "tb_reservations" DROP COLUMN "end_timestamp"`);
        await queryRunner.query(`ALTER TABLE "tb_reservations" ADD "end_timestamp" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tb_reservations" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "tb_reservations" ADD "status" character varying NOT NULL DEFAULT 'Pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_reservations" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "tb_reservations" ADD "status" character varying(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_reservations" DROP COLUMN "end_timestamp"`);
        await queryRunner.query(`ALTER TABLE "tb_reservations" ADD "end_timestamp" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_parking_slots" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "tb_parking_slots" DROP CONSTRAINT "UQ_eb5d74a1326e3081fda056b79d6"`);
        await queryRunner.query(`ALTER TABLE "tb_parking_slots" DROP COLUMN "slot_code"`);
        await queryRunner.query(`ALTER TABLE "tb_blocks" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "tb_vehicles" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "tb_customers" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "tb_users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "tb_users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "tb_users" DROP COLUMN "fullname"`);
        await queryRunner.query(`ALTER TABLE "tb_parking_slots" ADD "slot_number" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_parking_slots" ADD CONSTRAINT "UQ_d24bc1f342e8dce7450979cbea4" UNIQUE ("slot_number")`);
        await queryRunner.query(`ALTER TABLE "tb_reservations" RENAME COLUMN "end_timestamp" TO "duration_in_minutes"`);
    }

}
