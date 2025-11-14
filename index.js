import express from "express";
import dotenv from "dotenv";
import cors from "cors";   // <-- ADD THIS
import sequelize from "./config/db.js";

import Router from "./src/Routes/User.Routes.js";
import Lead from "./src/Routes/Lead.Routes.js";
import LeadLog from "./src/Routes/LeadLogs.Routes.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: "*", 
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
}));

app.use(express.json());

// ROUTES
app.use("/api", Router);
app.use("/api", Lead);
app.use("/api", LeadLog);


try {
  await sequelize.authenticate();
  console.log("✅ Database connected successfully");

  await sequelize.sync({ alter: true });
  console.log("📦 Models synchronized");
} catch (err) {
  console.error("❌ Database connection error:", err);
}

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
