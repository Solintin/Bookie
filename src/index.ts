import * as dotenv from "dotenv";
import app from "./app";
import { AppDataSource } from "./database/data-source";

dotenv.config();

const PORT = process.env.APP_PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database initialized successfully");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
