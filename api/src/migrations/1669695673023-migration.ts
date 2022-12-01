import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1669695673023 implements MigrationInterface {
    name = 'migration1669695673023'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user_profile" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "firstName" character varying NOT NULL,
                "lastName" character varying NOT NULL,
                "createDate" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user_profile"
        `);
    }

}
