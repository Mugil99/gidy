import express from "express";
import { uploadLogs, getLogs, getDashboardStats } from "../controllers/logController.js";

console.log("ROUTER.JS LOADED");

const router = express.Router();

router.post("/upload", uploadLogs);

router.get("/logs", getLogs);

router.get("/dashboard-stats", getDashboardStats);

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Router Working",
  });
});

export default router;
