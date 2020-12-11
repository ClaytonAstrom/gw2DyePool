import {MigrationInterface, QueryRunner} from "typeorm";

export class AllNullOnRGB1607702874758 implements MigrationInterface {
    name = 'AllNullOnRGB1607702874758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "color" ALTER COLUMN "cloth" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "color"."cloth" IS NULL`);
        await queryRunner.query(`ALTER TABLE "color" ALTER COLUMN "leather" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "color"."leather" IS NULL`);
        await queryRunner.query(`ALTER TABLE "color" ALTER COLUMN "metal" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "color"."metal" IS NULL`);
        await queryRunner.query(`ALTER TABLE "color" ALTER COLUMN "fur" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "color"."fur" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "color"."fur" IS NULL`);
        await queryRunner.query(`ALTER TABLE "color" ALTER COLUMN "fur" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "color"."metal" IS NULL`);
        await queryRunner.query(`ALTER TABLE "color" ALTER COLUMN "metal" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "color"."leather" IS NULL`);
        await queryRunner.query(`ALTER TABLE "color" ALTER COLUMN "leather" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "color"."cloth" IS NULL`);
        await queryRunner.query(`ALTER TABLE "color" ALTER COLUMN "cloth" SET NOT NULL`);
    }

}
