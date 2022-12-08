import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1669861427067 implements MigrationInterface {
    name = 'migration1669861427067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_profile"
            ADD CONSTRAINT "UQ_a134c3bb1a90a3b44d75e99c8c2" UNIQUE ("userEmail")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_profile" DROP CONSTRAINT "UQ_a134c3bb1a90a3b44d75e99c8c2"
        `);
    }

}
