import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import apiRoutes from "./routes/api";
import ordersRoutes from "./routes/orders";
import { errorHandler, notFound } from "./middleware/errorHandler";

dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.PORT || "3001", 10);
const NODE_ENV: string = process.env.NODE_ENV || "development";
const MONGODB_URL: string | undefined = process.env.MONGO_URI;

if (!MONGODB_URL) {
  throw new Error("MONGODB_URL is not defined in environment variables");
}

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: NODE_ENV === "production" ? 100 : 1000, // More lenient in development
  message: {
    error: "Too many requests from this IP, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Security middleware
app.use(helmet());

// Request logging
app.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: "10MB" }));
app.use(express.urlencoded({ extended: true, limit: "10MB" }));

// Apply rate limiting to API routes
app.use("/api", apiLimiter);

// Routes
app.use("/api/v1", apiRoutes);
app.use("/api/orders", ordersRoutes);

// Health check endpoint (directly on server for monitoring)
app.get("/health", (req: Request, res: Response): void => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV,
    version: "1.0.0",
    memory: process.memoryUsage()
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Database connection
mongoose
  .connect(MONGODB_URL, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down gracefully");
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port} in ${NODE_ENV} mode`);
});

export default app;
