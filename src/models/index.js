import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import UserModel from "./User.js";
import { logger } from "../config/logger.js";

export const User = UserModel(sequelize, DataTypes);

export const SyncModel = async () => {
    try {
        await sequelize.authenticate();
        logger.info("DB connected successfully");

        await sequelize.sync({alter: true});
        logger.info("All Models synchronized successfully");

    } catch (error){
        logger.error("DB connection error:", error.message);
        console.error(error);
    }
}