import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1669856340445 implements MigrationInterface {
    name = 'migration1669856340445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_profile" DROP COLUMN "firstName"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_profile" DROP COLUMN "lastName"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_profile"
            ADD "userEmail" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user_profile"
            ADD "userPassword" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_profile" DROP COLUMN "userPassword"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_profile" DROP COLUMN "userEmail"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_profile"
            ADD "lastName" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user_profile"
            ADD "firstName" character varying NOT NULL
        `);
    }

}
