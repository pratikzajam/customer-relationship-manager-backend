import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const LeadLog = sequelize.define(
  "LeadLog",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    leadId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "lead_id",
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
    },

    action: {
      type: DataTypes.ENUM(
        "created",
        "updated",
        "note",
        "status_changed",
        "assigned",
        "call",
        "meeting"
      ),
      allowNull: false,
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "lead_logs",
    timestamps: false,
  }
);

export default LeadLog;
