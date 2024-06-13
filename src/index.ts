import * as dotenv from "dotenv";
import app from "./app";
import { AppDataSource } from "./database/data-source";
import { createDatabaseIfNotExists } from "./Utils/helper";

dotenv.config();

const PORT = process.env.APP_PORT || 3000;

// console.log(AppDataSource);
const startApp = async () => {
  await createDatabaseIfNotExists();
  AppDataSource.initialize()
    .then(() => {
      console.log("Database initialized successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};
startApp();

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
