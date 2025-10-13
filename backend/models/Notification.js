import mongoose from "mongoose";

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ["unread", "read"], default: "unread" },
  type: { type: String, enum: ["warn", "info"], required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Notification", notificationSchema);
