import { MigrationInterface, QueryRunner } from "typeorm";

export class EntitiesCreated1691175469716 implements MigrationInterface {
    name = 'EntitiesCreated1691175469716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_vehicle_categories" ("id" SERIAL NOT NULL, "category_name" character varying(100) NOT NULL, "category_description" character varying(150) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4a2543c5a17418ac77e4f0ee3cc" UNIQUE ("category_name"), CONSTRAINT "PK_86716b785d0855917570a20f3a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_parking_slots" ("id" SERIAL NOT NULL, "slot_number" integer NOT NULL, "is_slot_available" boolean NOT NULL DEFAULT false, "categoryVehicleId" integer, "blockId" integer, CONSTRAINT "UQ_d24bc1f342e8dce7450979cbea4" UNIQUE ("slot_number"), CONSTRAINT "PK_f948c4d7722e8fb2a97e3cbec63" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_users" ("id" SERIAL NOT NULL, "username" character varying(25) NOT NULL, "password" character varying(65) NOT NULL, "login_last_at" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL DEFAULT 'Activo', "roleId" integer, CONSTRAINT "UQ_4402e5176d3d51b228b3466d07e" UNIQUE ("username"), CONSTRAINT "PK_a2c23e0679749c22ffa6c2be910" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_roles" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(150) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_912efbe26dcf6f9a7bbf2f5afda" UNIQUE ("name"), CONSTRAINT "PK_3b0d53fe6746de5283783e12ef8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" DROP CONSTRAINT "UQ_4a2543c5a17418ac77e4f0ee3cc"`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" DROP COLUMN "category_name"`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" DROP COLUMN "category_description"`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" ADD "category_name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" ADD CONSTRAINT "UQ_4a2543c5a17418ac77e4f0ee3cc" UNIQUE ("category_name")`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" ADD "category_description" character varying(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" ADD "code_block" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" ADD CONSTRAINT "UQ_232beb9f0a639a3c918586dd297" UNIQUE ("code_block")`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" ADD "total_slots" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" ADD "slots_available" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_parking_slots" ADD CONSTRAINT "FK_1797eef47568af815c8ebef45d1" FOREIGN KEY ("categoryVehicleId") REFERENCES "tb_vehicle_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_parking_slots" ADD CONSTRAINT "FK_5717afa9bb240490967e3311f5e" FOREIGN KEY ("blockId") REFERENCES "tb_vehicle_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_users" ADD CONSTRAINT "FK_f26b3dbb716e02c0ab4e6e738de" FOREIGN KEY ("roleId") REFERENCES "tb_roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_users" DROP CONSTRAINT "FK_f26b3dbb716e02c0ab4e6e738de"`);
        await queryRunner.query(`ALTER TABLE "tb_parking_slots" DROP CONSTRAINT "FK_5717afa9bb240490967e3311f5e"`);
        await queryRunner.query(`ALTER TABLE "tb_parking_slots" DROP CONSTRAINT "FK_1797eef47568af815c8ebef45d1"`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" DROP COLUMN "slots_available"`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" DROP COLUMN "total_slots"`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" DROP CONSTRAINT "UQ_232beb9f0a639a3c918586dd297"`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" DROP COLUMN "code_block"`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" DROP COLUMN "category_description"`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" DROP CONSTRAINT "UQ_4a2543c5a17418ac77e4f0ee3cc"`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" DROP COLUMN "category_name"`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" ADD "category_description" character varying(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" ADD "category_name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" ADD CONSTRAINT "UQ_4a2543c5a17418ac77e4f0ee3cc" UNIQUE ("category_name")`);
        await queryRunner.query(`DROP TABLE "tb_roles"`);
        await queryRunner.query(`DROP TABLE "tb_users"`);
        await queryRunner.query(`DROP TABLE "tb_parking_slots"`);
        await queryRunner.query(`DROP TABLE "tb_vehicle_categories"`);
    }

}
