import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1669856538440 implements MigrationInterface {
    name = 'migration1669856538440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_profile"
            ADD "userDisplayName" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_profile" DROP COLUMN "userDisplayName"
        `);
    }

}
