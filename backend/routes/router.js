import express from "express";
import { uploadLogs, getLogs, getDashboardStats } from "../controllers/logController.js";

const router = express.Router();

router.post("/upload", uploadLogs);

router.get("/logs", getLogs);

router.get("/dashboard-stats", getDashboardStats);
export default router;
