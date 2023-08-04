import { db } from "../config/database.js";
import { Sequelize } from "sequelize";

export const Data = db.define(
  "data",
  {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    key: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        msg: "The provided username is already taken. Please choose a different username.",
      },
    },
    value: Sequelize.STRING,
  },
  { timestamps: true, freezeTableName: true }
);
