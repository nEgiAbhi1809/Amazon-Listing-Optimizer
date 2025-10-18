import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/db.js";
import optimizationRoutes from "./routes/optimizationRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/optimize", optimizationRoutes);

// DB + Server start
sequelize.sync().then(() => {
  console.log("Database connected successfully!")
  app.listen(process.env.PORT, () =>
    console.log(`✅ Server running on port ${process.env.PORT}`)
  );
});
