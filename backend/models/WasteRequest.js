/*

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const wasteRequestSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    wasteType: [
      {
        type: String,
        enum: [
          "Organic Waste",
          "Paper Waste",
          "E-waste",
          "Hazardous Waste",
          "Plastic Waste",
          "Recycle Waste",
          "Metal Waste",
        ],
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "assigned", "picked-up"],
      default: "pending",
    },
    wasteCode: { type: String, unique: true },
    qrCode: { type: String, unique: true, sparse: true },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      address: { type: String },
    },
    assignedDriver: { type: Schema.Types.ObjectId, ref: "User" },
    pickupDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("WasteRequest", wasteRequestSchema);

**/
import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define sub-schema for waste type + quantity
const wasteItemSchema = new Schema({
  type: {
    type: String,
    enum: [
      "Organic Waste",
      "Paper Waste",
      "E-waste",
      "Hazardous Waste",
      "Plastic Waste",
      "Recycle Waste",
      "Metal Waste",
    ],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
});

const wasteRequestSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },

    wasteItems: {
      type: [wasteItemSchema],
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "assigned", "picked-up"],
      default: "pending",
    },
    pickupOption: {
      type: String,
      enum: ["Immediate Pickup", "Scheduled Pickup", "Flexible Pickup"],
      default: "Flexible Pickup",
      required: true,
    },
    wasteCode: { type: String, unique: true },
    qrCode: { type: String, unique: true, sparse: true },

    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      address: { type: String },
    },

    assignedDriver: { type: Schema.Types.ObjectId, ref: "User" },
    pickupDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("WasteRequest", wasteRequestSchema);
