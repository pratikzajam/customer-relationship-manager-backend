import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Lead = sequelize.define(
  "Lead",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    company: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },

    contact_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    contact_email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: { isEmail: true },
    },

    status: {
      type: DataTypes.ENUM(
        "New",
        "Contacted",
        "Qualified",
        "Converted",
        "Lost"
      ),
      defaultValue: "New",
    },

    source: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "admin_id",
    },

   
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "created_by",
    },

    
 
  },
  {
    tableName: "leads",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Lead;
