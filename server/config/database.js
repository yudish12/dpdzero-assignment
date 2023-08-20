import { Sequelize } from "sequelize";

// Determine the host based on the environment
const dbHost = process.env.NODE_ENV === "production" ? "db" : "localhost";

export const db = new Sequelize(
  "test",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: dbHost,
    dialect: "postgres",
  }
);
