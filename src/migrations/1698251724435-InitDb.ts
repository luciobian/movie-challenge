import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1698251724435 implements MigrationInterface {
    name = 'InitDb1698251724435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "director" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_b85b179882f31c43324ef124fea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "gender" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_98a711129bc073e6312d08364e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying NOT NULL, "description" character varying NOT NULL, "budget" numeric(10,2) NOT NULL, "director_id" uuid, "gender_id" uuid, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "actor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_05b325494fcc996a44ae6928e5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "email" character varying NOT NULL, "password" character varying NOT NULL, "role_id" uuid, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie_actor" ("actor" uuid NOT NULL, "movie" uuid NOT NULL, CONSTRAINT "PK_3e9bb111c8b2170a4d24781e297" PRIMARY KEY ("actor", "movie"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1a1bae34acf322e7d38dbfe859" ON "movie_actor" ("actor") `);
        await queryRunner.query(`CREATE INDEX "IDX_a25eeba7f081bfdc9716560fc5" ON "movie_actor" ("movie") `);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_8aefbf59e604cdd127da5a093c5" FOREIGN KEY ("director_id") REFERENCES "director"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_568be9d2b58ff591b6af843ed1c" FOREIGN KEY ("gender_id") REFERENCES "gender"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_1a1bae34acf322e7d38dbfe8595" FOREIGN KEY ("actor") REFERENCES "actor"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_a25eeba7f081bfdc9716560fc5b" FOREIGN KEY ("movie") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_a25eeba7f081bfdc9716560fc5b"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_1a1bae34acf322e7d38dbfe8595"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_568be9d2b58ff591b6af843ed1c"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_8aefbf59e604cdd127da5a093c5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a25eeba7f081bfdc9716560fc5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1a1bae34acf322e7d38dbfe859"`);
        await queryRunner.query(`DROP TABLE "movie_actor"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "actor"`);
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TABLE "gender"`);
        await queryRunner.query(`DROP TABLE "director"`);
    }

}
