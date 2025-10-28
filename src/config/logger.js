import { createLogger, format, transports } from "winston";

export const logger = createLogger({
    level: "info",

    format: format.combine(
        format.json(),
        format.simple(),
        format.splat(),
        format.errors({stack: true}),
        format.timestamp(),
    ),

    defaultMeta: {service: "auth-service"},

    transports: [
        new transports.Console(),
        new transports.File({filename: "logs/error.log", level: "error"}),
        new transports.File({filename: "logs/combined.log"}),
    ]
});