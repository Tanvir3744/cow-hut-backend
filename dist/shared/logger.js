"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const path_1 = __importDefault(require("path"));
const { combine, timestamp, label, printf } = winston_1.format;
// formating the logger according to mine,
const logFormat = printf(({ label, timestamp, message, level }) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return `${date.toDateString()}: ${hours}:${minute}:${second} [${label} ${level} : ${message}] `;
});
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(label({ label: 'information given about' }), timestamp(), logFormat),
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'logs', 'winston', 'successes', 'cow-hut-%DATE%-sucess.log'),
            datePattern: 'YYYY-DD-MM-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});
const errorLogger = (0, winston_1.createLogger)({
    level: 'error',
    format: combine(label({ label: "right meow!" }), timestamp(), logFormat),
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), "logs", "winston", "errors", "university-%DATE%-error.log"),
            datePattern: 'YYYY-DD-MM-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '15d'
        })
    ],
});
/* export { logger, errorLogger }; */ 
