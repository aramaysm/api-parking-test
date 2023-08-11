import { MigrationInterface, QueryRunner } from 'typeorm';

export class EntitiesUpdated1691706145399 implements MigrationInterface {
  name = 'EntitiesUpdated1691706145399';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tb_reservations" DROP COLUMN "start_timestamp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_reservations" DROP COLUMN "end_timestamp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_reservations" ADD "duration_in_minutes" integer NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_parking_slots" ALTER COLUMN "is_slot_available" SET DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_parking_slots" ALTER COLUMN "is_slot_available" SET DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tb_parking_slots" ALTER COLUMN "is_slot_available" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_parking_slots" ALTER COLUMN "is_slot_available" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_reservations" DROP COLUMN "duration_in_minutes"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_reservations" ADD "end_timestamp" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_reservations" ADD "start_timestamp" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }
}
