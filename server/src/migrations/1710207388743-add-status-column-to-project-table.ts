import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStatusColumnToProjectTable1710207388743
  implements MigrationInterface
{
  name = 'AddStatusColumnToProjectTable1710207388743';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project" ADD "status" character varying NOT NULL DEFAULT 'To Do'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "status"`);
  }
}
