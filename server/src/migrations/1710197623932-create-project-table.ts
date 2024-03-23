import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProjectTable1710197623932 implements MigrationInterface {
  name = 'CreateProjectTable1710197623932';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "project" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project" DROP CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63"`,
    );
    await queryRunner.query(`DROP TABLE "project"`);
  }
}
