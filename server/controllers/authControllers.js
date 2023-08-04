import { catchAsync } from "../config/catchAsync.js";
import { AppError } from "../config/Apperror.js";
import { User } from "../models/user.js";
import { Op, where } from "sequelize";
import { signToken } from "../config/signtoken.js";

export const loginController = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const err = new AppError(
      "Missing fields. Please provide both username and password.",
      404,
      "MISSING_FIELDS"
    );
    next(err);
  }

  const user = await User.findOne({
    where: {
      [Op.and]: [{ email: email }, { password: password }],
    },
  });

  if (!user) {
    next(
      new AppError(
        "Invalid credentials. The provided username or password is incorrect.",
        404,
        "INVALID_CREDENTIALS"
      )
    );
  }

  return res.status(200).json({
    status: "success",
    message: "Access token generated successfully.",
    data: {
      access_token: signToken({
        id: user.id,
        email: email,
        username: user.username,
        fullname: user.full_name,
      }),
    },
  });
});

export const registerController = catchAsync(async (req, res, next) => {
  const { username, email, password, full_name } = req.body;

  if (!username || !email || !password || !full_name) {
    next(
      new AppError(
        "Invalid request. Please provide all required fields: username, email, password, full_name.",
        404,
        "INVALID_REQUEST"
      )
    );
  }

  const user = await User.create(req.body);

  delete user["password"];

  res.status(200).json({
    status: "success",
    message: "User successfully registered!",
    data: user,
  });
});
