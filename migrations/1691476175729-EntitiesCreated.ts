import { MigrationInterface, QueryRunner } from "typeorm";

export class EntitiesCreated1691476175729 implements MigrationInterface {
    name = 'EntitiesCreated1691476175729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_parking_slots" DROP CONSTRAINT "FK_5717afa9bb240490967e3311f5e"`);
        await queryRunner.query(`CREATE TABLE "tb_blocks" ("id" SERIAL NOT NULL, "code_block" character varying(100) NOT NULL, "total_slots" integer NOT NULL, "slots_available" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e7ab92ddec2b55c857c9997e21e" UNIQUE ("code_block"), CONSTRAINT "PK_1932c66d3a3539e7e38ab40bfe6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" DROP CONSTRAINT "UQ_232beb9f0a639a3c918586dd297"`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" DROP COLUMN "code_block"`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" DROP COLUMN "total_slots"`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" DROP COLUMN "slots_available"`);
        await queryRunner.query(`ALTER TABLE "tb_parking_slots" ADD CONSTRAINT "FK_5717afa9bb240490967e3311f5e" FOREIGN KEY ("blockId") REFERENCES "tb_blocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_parking_slots" DROP CONSTRAINT "FK_5717afa9bb240490967e3311f5e"`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" ADD "slots_available" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" ADD "total_slots" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" ADD "code_block" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_vehicle_categories" ADD CONSTRAINT "UQ_232beb9f0a639a3c918586dd297" UNIQUE ("code_block")`);
        await queryRunner.query(`DROP TABLE "tb_blocks"`);
        await queryRunner.query(`ALTER TABLE "tb_parking_slots" ADD CONSTRAINT "FK_5717afa9bb240490967e3311f5e" FOREIGN KEY ("blockId") REFERENCES "tb_vehicle_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
