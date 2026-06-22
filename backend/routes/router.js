import express from "express";
import { uploadLogs, getLogs, getDashboardStats } from "../controllers/logController.js";

console.log("ROUTER.JS LOADED");

const router = express.Router();

router.post("/upload", async (req, res) => {
  try {
    const logs = req.body;

    if (!Array.isArray(logs)) {
      return res.status(400).json({
        success: false,
        message: "Request body must be an array",
      });
    }

    const result = await Log.insertMany(logs, {
      ordered: false,
    });

    return res.status(201).json({
      success: true,
      insertedCount: result.length,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/logs", getLogs);

router.get("/dashboard-stats", getDashboardStats);

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Router Working",
  });
});

export default router;
