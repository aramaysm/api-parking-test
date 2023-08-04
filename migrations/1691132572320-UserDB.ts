import { MigrationInterface, QueryRunner } from "typeorm";

export class UserDB1691132572320 implements MigrationInterface {
    name = 'UserDB1691132572320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_user" ("id" SERIAL NOT NULL, "username" character varying(25) NOT NULL, "password" character varying(65) NOT NULL, "login_last_at" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL DEFAULT 'Activo', CONSTRAINT "UQ_73b9d65d3c93dcf253eaa9b5570" UNIQUE ("username"), CONSTRAINT "PK_1943338f8f00e074a3c5bb48d5e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tb_user"`);
    }

}
