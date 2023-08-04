import { catchAsync } from "../config/catchAsync.js";
import { User } from "../models/user.js";
import { AppError } from "../config/Apperror.js";
import jwt from "jsonwebtoken";
import { where } from "sequelize";
import { Data } from "../models/data.js";

export const checkToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("Invalid access token provided", 401, "INVALID_TOKEN")
    );
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: decoded.obj.id } });
    if (!user) {
      return next(
        new AppError("Invalid access token provided", 401, "INVALID_TOKEN")
      );
    }
    req.user = user;
    return next();
  } catch (error) {
    return next(
      new AppError("Invalid access token provided", 401, "INVALID_TOKEN")
    );
  }
};

export const checkey = catchAsync(async (req, res, next) => {
  const key = req._parsedUrl.path.split("/")[1];

  const data = await Data.findOne({ where: { key: key } });

  if (!data) {
    return next(
      new AppError(
        "The provided key does not exist in the database.",
        404,
        "KEY_NOT_FOUND"
      )
    );
  }
  res.data = data;
  next();
});
