import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1669939603383 implements MigrationInterface {
    name = 'migration1669939603383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_profile"
            ADD CONSTRAINT "UQ_b8bc667a9e3a81bb818e55a085d" UNIQUE ("userDisplayName")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_profile" DROP CONSTRAINT "UQ_b8bc667a9e3a81bb818e55a085d"
        `);
    }

}
