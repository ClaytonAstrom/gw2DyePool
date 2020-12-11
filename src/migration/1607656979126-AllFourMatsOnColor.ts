import {MigrationInterface, QueryRunner} from "typeorm";

export class AllFourMatsOnColor1607656979126 implements MigrationInterface {
    name = 'AllFourMatsOnColor1607656979126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "color" DROP COLUMN "base_rgb"`);
        await queryRunner.query(`ALTER TABLE "color" ADD "cloth" integer array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "color" ADD "leather" integer array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "color" ADD "metal" integer array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "color" ADD "fur" integer array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "color" DROP COLUMN "fur"`);
        await queryRunner.query(`ALTER TABLE "color" DROP COLUMN "metal"`);
        await queryRunner.query(`ALTER TABLE "color" DROP COLUMN "leather"`);
        await queryRunner.query(`ALTER TABLE "color" DROP COLUMN "cloth"`);
        await queryRunner.query(`ALTER TABLE "color" ADD "base_rgb" integer array NOT NULL`);
    }

}
