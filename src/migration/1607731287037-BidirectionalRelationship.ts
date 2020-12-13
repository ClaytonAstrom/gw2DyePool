import {MigrationInterface, QueryRunner} from "typeorm";

export class BidirectionalRelationship1607731287037 implements MigrationInterface {
    name = 'BidirectionalRelationship1607731287037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ADD "colorId" integer`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "UQ_4a9e4759ce4e217ff1c2a7cfdbb" UNIQUE ("colorId")`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_4a9e4759ce4e217ff1c2a7cfdbb" FOREIGN KEY ("colorId") REFERENCES "color"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_4a9e4759ce4e217ff1c2a7cfdbb"`);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "UQ_4a9e4759ce4e217ff1c2a7cfdbb"`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "colorId"`);
    }

}
