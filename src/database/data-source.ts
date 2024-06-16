import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { isLocal } from "../Utils/constant.utils";
dotenv.config();

const entityRoute = isLocal ? "src/**/entities/*.ts" : "build/**/entities/*.js";
const migrationRoute = isLocal
  ? "src/**/database/migrations/*.ts"
  : "build/**/database/migrations/*.js";

console.log(isLocal);

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || "user",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "bookie",
  logging: true,
  synchronize: false,
  ssl: {
    rejectUnauthorized: true,
  },
  subscribers: [],
  entities: [entityRoute],
  migrations: [migrationRoute],
});
