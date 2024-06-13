import { MigrationInterface, QueryRunner } from "typeorm";

export class Createauthor1718313783185 implements MigrationInterface {
    name = 'Createauthor1718313783185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`authors\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`bio\` varchar(255) NULL, \`image\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_ea066641108f693660071dfa79\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_ea066641108f693660071dfa79\` ON \`authors\``);
        await queryRunner.query(`DROP TABLE \`authors\``);
    }

}
