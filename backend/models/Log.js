import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    actor: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    resource: {
      type: String,
      required: true,
    },

    resourceType: {
      type: String,
      required: true,
    },

    ipAddress: {
      type: String,
      required: true,
    },

    region: {
      type: String,
      required: true,
    },

    severity: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Resolved", "Unresolved"],
      required: true,
    },

    timestamp: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

logSchema.index({ timestamp: -1 });
logSchema.index({ severity: 1 });
logSchema.index({ status: 1 });
logSchema.index({ actor: 1 });

const Log = mongoose.model("Log", logSchema);

export default Log;