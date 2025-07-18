const express = require("express");
import dotenv from "dotenv";
import cors from "cors";

require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // only if you face SSL errors (Neon uses SSL)
  },
  host: process.env.PG_HOST ?? "localhost",
  port: parseInt(process.env.PG_PORT ?? "5432", 10),
  user: process.env.PG_USER ?? "postgres",
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE ?? "fullstacknextjs",
});

// const MONGODB_URI = process.env.MONGODB_URI as string;

dotenv.config();
const app = express();
const port = process.env.HOST_ENV ?? "";

// const dbConnect = async () => {
//   try {
//     await mongoose.connect(MONGODB_URI);
//     if (!MONGODB_URI) {
//     throw new Error("❌ MONGO_URI is not defined in environment variables.");
//       }
//     console.log("MongoDB connected successfully");
//   } catch (error) {
//     console.error("MongoDB connection failed:", (error as Error).message);
//     throw new Error("MongoDB connection failed");
//   }
// };

const postgresConnect = async () => {
  try {
    // Connect to PostgreSQL
    await pool.connect();
    if (!pool) {
      throw new Error(
        "❌ POSTGRES_URI is not defined in environment variables."
      );
    }
    console.log("✅ PostgreSQL connected successfully");
  } catch (error) {
    console.error("❌ PostgreSQL connection failed:", (error as Error).message);
    throw new Error("PostgreSQL connection failed");
  }
};

// CORS middleware configuration
const corsOptions = {
  origin: port, // Replace with your frontend URL
  methods: "GET,POST,PUT,DELETE,HEAD,PATCH", // Allowable methods
};

app.use(cors(corsOptions));

// export { dbConnect, postgresConnect };
export { postgresConnect };
