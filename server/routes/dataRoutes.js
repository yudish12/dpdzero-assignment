import express from "express";
import {
  deleteData,
  retrieveData,
  storeData,
  updateData,
} from "../controllers/dataControllers.js";
import { checkey } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", storeData);

router.use(checkey);

router.route("/:key").get(retrieveData).put(updateData).delete(deleteData);

export default router;
