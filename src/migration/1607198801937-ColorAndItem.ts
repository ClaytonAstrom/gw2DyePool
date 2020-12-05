import { MigrationInterface, QueryRunner } from "typeorm";

export class ColorAndItem1607198801937 implements MigrationInterface {
  name = "ColorAndItem1607198801937";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "item" ("id" integer NOT NULL, "chat_link" character varying NOT NULL, "icon" character varying NOT NULL, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "color" ("id" integer NOT NULL, "name" character varying NOT NULL, "base_rgb" integer array NOT NULL, "itemId" integer, CONSTRAINT "REL_0b78abf02b92b95eead41a7c16" UNIQUE ("itemId"), CONSTRAINT "PK_d15e531d60a550fbf23e1832343" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "color" ADD CONSTRAINT "FK_0b78abf02b92b95eead41a7c16e" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "color" DROP CONSTRAINT "FK_0b78abf02b92b95eead41a7c16e"`
    );
    await queryRunner.query(`DROP TABLE "color"`);
    await queryRunner.query(`DROP TABLE "item"`);
  }
}
