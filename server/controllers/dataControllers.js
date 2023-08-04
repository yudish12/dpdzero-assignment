import { where } from "sequelize";
import { AppError } from "../config/Apperror.js";
import { catchAsync } from "../config/catchAsync.js";
import { Data } from "../models/data.js";

export const storeData = catchAsync(async (req, res, next) => {
  const { key, value } = req.body;
  if (!key) {
    return next(
      new AppError(
        "The provided key is not valid or missing.",
        404,
        "INVALID_KEY"
      )
    );
  }
  if (!value) {
    return next(
      new AppError(
        "The provided value is not valid or missing.",
        404,
        "INVALID_VALUE"
      )
    );
  }

  const isUnique = await Data.findOne({
    where: {
      key: req.body.key,
    },
  });

  if (!isUnique) {
    await Data.create(req.body);

    return res.status(200).json({
      status: "success",
      message: "Data stored successfully.",
    });
  }

  next(
    new AppError(
      "The provided key already exists in the database. To update an existing key, use the update API.",
      404,
      "KEY_EXISTS"
    )
  );
});

export const retrieveData = catchAsync(async (req, res, next) => {
  return res.status(200).json(res.data);
});

export const updateData = catchAsync(async (req, res, next) => {
  const data = Data.update(
    { value: req.body.value },
    {
      where: {
        key: res.data.key,
      },
    }
  );

  return res.status(200).json({
    status: "success",
    message: "Data updated successfully.",
  });
});

export const deleteData = catchAsync(async (req, res, next) => {
  const { key } = req.params;
  await Data.destroy({ where: { key: key } });
  return res.status(200).json({
    status: "success",
    message: "Data deleted successfully.",
  });
});
