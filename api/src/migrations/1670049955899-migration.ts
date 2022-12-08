import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1670049955899 implements MigrationInterface {
    name = 'migration1670049955899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_profile"
            ADD "deletedDate" TIMESTAMP
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_profile" DROP COLUMN "deletedDate"
        `);
    }

}
