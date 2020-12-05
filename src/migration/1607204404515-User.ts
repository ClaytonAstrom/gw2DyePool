import {MigrationInterface, QueryRunner} from "typeorm";

export class User1607204404515 implements MigrationInterface {
    name = 'User1607204404515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("name" character varying NOT NULL, "key" character varying NOT NULL, CONSTRAINT "PK_065d4d8f3b5adb4a08841eae3c8" PRIMARY KEY ("name"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
