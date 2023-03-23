import dotenv from "dotenv";

dotenv.config();

export const secret = process.env.ACCESS_TOKEN_SECRET;
export const maxRows = 50000;
export const batchSize = 1000;
