import express from "express";
import "dotenv/config";
import { db } from "./config/database.js";
import cookieParser from "cookie-parser";
import dateRoutes from "./routes/dataRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { AppError } from "./config/Apperror.js";
import { checkToken } from "./middlewares/authMiddleware.js";

//test db
db.authenticate()
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

db.sync()
  .then((result) => {
    app.listen(5000);
  })
  .catch((err) => {});

const app = express();

app.use(express.json());
app.use(cookieParser());

//Routes defined
app.use("/api", userRoutes);
app.use(checkToken);
app.use("/api/data", dateRoutes);

//app error class for creating error objects and send responses based on that
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find route ${req.originalUrl} in the server`));
});

//error middle ware whenever first arg is err object it is error middleware
app.use(errorHandler);

/*
server object listening on port 5000 if no 
port in environment variables
*/

const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server Started");
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! ");
  server.close(() => {
    process.exit(1);
  });
});
