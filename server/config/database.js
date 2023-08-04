import { Sequelize } from "sequelize";

export const db = new Sequelize(
  "test",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);
