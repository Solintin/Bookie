import * as dotenv from "dotenv";

dotenv.config();

export const isLocal = process.env.NODE_ENV === "development";
