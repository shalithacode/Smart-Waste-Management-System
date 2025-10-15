import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import wasteRequestRoutes from "./routes/wasteRequestRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/waste-requests", wasteRequestRoutes);
app.use("/api/admin", adminRoutes);

export default app;
