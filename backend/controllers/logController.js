import Log from "../models/Log.js";

export const uploadLogs = async (req, res) => {
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
};

export const getLogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, severity, status, role, search, sortField = "timestamp", sortOrder = "desc" } = req.query;

    const filter = {};

    if (severity) {
      filter.severity = severity;
    }

    if (status) {
      filter.status = status;
    }

    if (role) {
      filter.role = role;
    }

    if (search) {
      filter.$or = [
        {
          actor: {
            $regex: search,
            $options: "i",
          },
        },
        {
          action: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const logs = await Log.find(filter)
      .sort({
        [sortField]: sortOrder === "asc" ? 1 : -1,
      })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Log.countDocuments(filter);

    return res.status(200).json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      logs,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const totalLogs = await Log.countDocuments();

    const highSeverity = await Log.countDocuments({
      severity: "HIGH",
    });

    const resolved = await Log.countDocuments({
      status: "Resolved",
    });

    const unresolved = await Log.countDocuments({
      status: "Unresolved",
    });

    return res.status(200).json({
      totalLogs,
      highSeverity,
      resolved,
      unresolved,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
