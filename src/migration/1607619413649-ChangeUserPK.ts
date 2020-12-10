import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeUserPK1607619413649 implements MigrationInterface {
    name = 'ChangeUserPK1607619413649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_065d4d8f3b5adb4a08841eae3c8"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_489efb720a2e872384f78eef1bd" PRIMARY KEY ("name", "id")`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_489efb720a2e872384f78eef1bd"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_489efb720a2e872384f78eef1bd" PRIMARY KEY ("name", "id")`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_489efb720a2e872384f78eef1bd"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_065d4d8f3b5adb4a08841eae3c8" PRIMARY KEY ("name")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    }

}
