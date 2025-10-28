import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load correct .env file based on NODE_ENV
const envFile =
  process.env.NODE_ENV === "test"
    ? ".env.test"
    : process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env";

dotenv.config({ path: envFile });

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT, NODE_ENV } =
  process.env;

let sequelize;

if (NODE_ENV === "test" || DB_DIALECT === "sqlite") {
  // SQLite for fast, isolated testing
  sequelize = new Sequelize("sqlite::memory:", { logging: false });
} else {
  // MySQL for dev and production
  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: NODE_ENV === "development" ? console.log : false,
  });
}

export { sequelize };
