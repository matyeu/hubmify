import { createPool } from "mysql2/promise";
import { configDotenv } from "dotenv";

configDotenv();

type Database = {
  host: string;
  user: string;
  password: string;
  database: string;
  waitForConnections: boolean;
  connectionLimit: number;
  queueLimit: number;
  port: number;
};

const dbConfig: Database = {
  host: process.env.DATABASE_HOST || "localhost",
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "",
  database: process.env.DATABASE_NAME || "hubmify",
  port: parseInt(process.env.DATABASE_PORT || "3306"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export const database = createPool(dbConfig);
