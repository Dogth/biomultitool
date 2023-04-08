import { pino } from "pino";

const logParams = {};

const streams = [{ stream: process.stdout }];

const logger = pino(logParams, pino.multistream(streams));

logger.info(`Logging started...`);

export default logger;
