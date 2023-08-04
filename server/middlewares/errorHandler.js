const handleDbErrors = (err) => {
  switch (err.errors[0].validatorKey) {
    case "isStrongPassword":
      return "INVALID_PASSWORD";

    case "isPositiveNumber":
      return "INVALID_AGE";

    case "is_null":
      return "GENDER_REQUIRED";

    case "not_unique":
      return err.errors[0].path === "username"
        ? "USERNAME_EXISTS"
        : "EMAIL_EXISTS";

    default:
      return "INTERNAL_ERROR";
  }
};

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; //checking weather statuscode is there if not assign 500
  err.status = "error"; //if status not there just assign error

  if (!err.code) {
    err.message = err?.errors[0]?.message;
    const code = handleDbErrors(err);
    err.code = code;
  }

  //returns the error response in json to user
  return res.status(err.statusCode).json({
    status: err.status,
    code: err.code,
    message: err.message,
  });
};
