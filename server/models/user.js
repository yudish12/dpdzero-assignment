import { Sequelize } from "sequelize";
import { db } from "../config/database.js";

export const User = db.define(
  "users",
  {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    full_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        msg: "The provided username is already taken. Please choose a different username.",
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isStrongPassword(value) {
          // Use a regular expression to check the password requirements
          const passwordRegex =
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\$%\^&\*]).{8,}$/;
          if (!passwordRegex.test(value)) {
            throw new Error(
              "Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters."
            );
          }
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        msg: "The provided email is already registered. Please use a different email address.",
      },
      validate: {
        isEmail: true,
      },
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isPositiveNumber(value) {
          if (value <= 0) {
            throw new Error("Invalid age value.Age must be a positive number.");
          }
        },
      },
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Gender field is required. Please specify the gender (e.g., male, female, non-binary).",
        },
        notEmpty: {
          args: true,
          msg: "Gender field is required. Please specify the gender (e.g., male, female, non-binary).",
        },
      },
    },
  },
  { timestamps: true, freezeTableName: true }
);
