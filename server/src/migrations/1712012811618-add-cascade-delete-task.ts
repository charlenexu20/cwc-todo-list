import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCascadeDeleteTask1712012811618 implements MigrationInterface {
  name = 'AddCascadeDeleteTask1712012811618';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_b1500fa73277080dc0d730f2316"`,
    );
    await queryRunner.query(`ALTER TABLE "user_story" DROP COLUMN "status"`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_b1500fa73277080dc0d730f2316" FOREIGN KEY ("userStoryId") REFERENCES "user_story"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_b1500fa73277080dc0d730f2316"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_story" ADD "status" character varying NOT NULL DEFAULT 'To Do'`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_b1500fa73277080dc0d730f2316" FOREIGN KEY ("userStoryId") REFERENCES "user_story"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
