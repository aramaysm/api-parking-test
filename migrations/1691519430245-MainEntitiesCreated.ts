import { MigrationInterface, QueryRunner } from "typeorm";

export class MainEntitiesCreated1691519430245 implements MigrationInterface {
    name = 'MainEntitiesCreated1691519430245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_vehicle_categories" ("id" SERIAL NOT NULL, "category_name" character varying(100) NOT NULL, "category_description" character varying(150) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4a2543c5a17418ac77e4f0ee3cc" UNIQUE ("category_name"), CONSTRAINT "PK_86716b785d0855917570a20f3a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_roles" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(150) NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_912efbe26dcf6f9a7bbf2f5afda" UNIQUE ("name"), CONSTRAINT "PK_3b0d53fe6746de5283783e12ef8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_users" ("id" SERIAL NOT NULL, "username" character varying(25) NOT NULL, "password" character varying(65) NOT NULL, "login_last_at" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL DEFAULT 'Activo', "roleId" integer, CONSTRAINT "UQ_4402e5176d3d51b228b3466d07e" UNIQUE ("username"), CONSTRAINT "PK_a2c23e0679749c22ffa6c2be910" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_customers" ("id" SERIAL NOT NULL, "dni" character varying(11) NOT NULL, "payment_card" character varying(20) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "UQ_dadf726076d1a27057e7c7b0dd2" UNIQUE ("dni"), CONSTRAINT "PK_366d9a272614a95e2fae367af28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_vehicles" ("id" SERIAL NOT NULL, "plate" character varying(10) NOT NULL, "description" character varying(250) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" integer, "ownerId" integer, CONSTRAINT "UQ_b50b93aa15f4b990e583f4b43c4" UNIQUE ("plate"), CONSTRAINT "PK_c46e3ac437cc1d1e3ef8048a33b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_reservations" ("id" SERIAL NOT NULL, "start_timestamp" TIMESTAMP NOT NULL DEFAULT now(), "duration_in_minutes" integer NOT NULL, "status" character varying(10) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "parkingSlotId" integer, "vehicleId" integer, CONSTRAINT "PK_84ba57fad4e824500de8f02d6f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_parking_slots" ("id" SERIAL NOT NULL, "slot_number" integer NOT NULL, "is_slot_available" boolean NOT NULL DEFAULT false, "categoryId" integer, "blockId" integer, CONSTRAINT "UQ_d24bc1f342e8dce7450979cbea4" UNIQUE ("slot_number"), CONSTRAINT "PK_f948c4d7722e8fb2a97e3cbec63" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_blocks" ("id" SERIAL NOT NULL, "code_block" character varying(100) NOT NULL, "total_slots" integer NOT NULL, "slots_available" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e7ab92ddec2b55c857c9997e21e" UNIQUE ("code_block"), CONSTRAINT "PK_1932c66d3a3539e7e38ab40bfe6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tb_users" ADD CONSTRAINT "FK_f26b3dbb716e02c0ab4e6e738de" FOREIGN KEY ("roleId") REFERENCES "tb_roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_customers" ADD CONSTRAINT "FK_ef52c0166921e9fdc07bc2f8cf7" FOREIGN KEY ("userId") REFERENCES "tb_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_vehicles" ADD CONSTRAINT "FK_033e733f94459337b549a486d3f" FOREIGN KEY ("categoryId") REFERENCES "tb_vehicle_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_vehicles" ADD CONSTRAINT "FK_449672e4ee9bf78b2ef5027c7c9" FOREIGN KEY ("ownerId") REFERENCES "tb_customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_reservations" ADD CONSTRAINT "FK_a945277f773a0ac5891e5a12be6" FOREIGN KEY ("parkingSlotId") REFERENCES "tb_parking_slots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_reservations" ADD CONSTRAINT "FK_17753ba59543c2b817461c8bd12" FOREIGN KEY ("vehicleId") REFERENCES "tb_vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_parking_slots" ADD CONSTRAINT "FK_da47887d651da644a92924a9055" FOREIGN KEY ("categoryId") REFERENCES "tb_vehicle_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_parking_slots" ADD CONSTRAINT "FK_5717afa9bb240490967e3311f5e" FOREIGN KEY ("blockId") REFERENCES "tb_blocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_parking_slots" DROP CONSTRAINT "FK_5717afa9bb240490967e3311f5e"`);
        await queryRunner.query(`ALTER TABLE "tb_parking_slots" DROP CONSTRAINT "FK_da47887d651da644a92924a9055"`);
        await queryRunner.query(`ALTER TABLE "tb_reservations" DROP CONSTRAINT "FK_17753ba59543c2b817461c8bd12"`);
        await queryRunner.query(`ALTER TABLE "tb_reservations" DROP CONSTRAINT "FK_a945277f773a0ac5891e5a12be6"`);
        await queryRunner.query(`ALTER TABLE "tb_vehicles" DROP CONSTRAINT "FK_449672e4ee9bf78b2ef5027c7c9"`);
        await queryRunner.query(`ALTER TABLE "tb_vehicles" DROP CONSTRAINT "FK_033e733f94459337b549a486d3f"`);
        await queryRunner.query(`ALTER TABLE "tb_customers" DROP CONSTRAINT "FK_ef52c0166921e9fdc07bc2f8cf7"`);
        await queryRunner.query(`ALTER TABLE "tb_users" DROP CONSTRAINT "FK_f26b3dbb716e02c0ab4e6e738de"`);
        await queryRunner.query(`DROP TABLE "tb_blocks"`);
        await queryRunner.query(`DROP TABLE "tb_parking_slots"`);
        await queryRunner.query(`DROP TABLE "tb_reservations"`);
        await queryRunner.query(`DROP TABLE "tb_vehicles"`);
        await queryRunner.query(`DROP TABLE "tb_customers"`);
        await queryRunner.query(`DROP TABLE "tb_users"`);
        await queryRunner.query(`DROP TABLE "tb_roles"`);
        await queryRunner.query(`DROP TABLE "tb_vehicle_categories"`);
    }

}
