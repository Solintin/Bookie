import * as mysql from "mysql2/promise";
import "reflect-metadata";
import * as dotenv from "dotenv";

dotenv.config();
export async function createDatabaseIfNotExists() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      ssl: {
        // Use the appropriate SSL options as per your requirement
        // This is just an example. You may need to adjust the paths and other parameters.
        rejectUnauthorized: true,
      },
    });

    const databaseName = process.env.DB_DATABASE;

    // Check if the database exists
    const [databases] = await connection.query("SHOW DATABASES LIKE ?", [
      databaseName,
    ]);

    // Create the database if it doesn't exist
    if ((databases as any[]).length === 0) {
      await connection.query(`CREATE DATABASE \`${databaseName}\``);
      console.log(`Database '${databaseName}' created.`);
    } else {
      console.log(`Database '${databaseName}' already exists.`);
    }

    await connection.end();
  } catch (error) {
    console.error("Error during database creation: ", error);
  }
}
