import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import apiRoutes from "./routes/api";
import ordersRoutes from "./routes/orders";
import authRoutes from "./routes/auth";
import { errorHandler, notFound } from "./middleware/errorHandler";
import db from "./db";

const app: Application = express();
const port: number = parseInt(process.env.PORT || "3001", 10);
const NODE_ENV: string = process.env.NODE_ENV || "development";

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: NODE_ENV === "production" ? 100 : 1000,
  message: { error: "Too many requests from this IP, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet());
app.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));
app.use(cors({ origin: process.env.CORS_ORIGIN || "*", credentials: true }));
app.use(express.json({ limit: "10MB" }));
app.use(express.urlencoded({ extended: true, limit: "10MB" }));
app.use("/api", apiLimiter);

app.use("/api/v1", apiRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/auth", authRoutes);

app.get("/health", (req: Request, res: Response): void => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV,
    version: "1.0.0",
    memory: process.memoryUsage(),
    database: "PostgreSQL (Supabase)"
  });
});

app.use(notFound);
app.use(errorHandler);

process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  console.log("PostgreSQL connection via Supabase client closed");
  process.exit(0);
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port} in ${NODE_ENV} mode`);
});

export default app;