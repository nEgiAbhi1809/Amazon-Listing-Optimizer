import express from "express";
import { optimizeListing, getHistory } from "../controllers/optimizationController.js";

const router = express.Router();

router.post("/", optimizeListing);
router.get("/:asin", getHistory);

export default router;
