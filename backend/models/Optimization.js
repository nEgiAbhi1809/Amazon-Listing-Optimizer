import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Optimization = sequelize.define("Optimization", {
  asin: { type: DataTypes.STRING, allowNull: false },
  originalTitle: DataTypes.TEXT,
  originalBullets: DataTypes.TEXT,
  originalDescription: DataTypes.TEXT,
  optimizedTitle: DataTypes.TEXT,
  optimizedBullets: DataTypes.TEXT,
  optimizedDescription: DataTypes.TEXT,
  keywords: DataTypes.TEXT,
});

export default Optimization;
