import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { logger } from "./config/logger.js";
import { SyncModel } from "./models/index.js";

const PORT = process.env.SERVICE_PORT || 4000;

const Start = async () => {
    try {
        await SyncModel();

        app.listen(PORT, () => logger.info(`Auth service running on port ${PORT}`));
    
    } catch (error) {
        logger.error({message: `Error starting server`})
        process.exit(1);
    }
}

await Start();