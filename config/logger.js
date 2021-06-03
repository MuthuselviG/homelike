const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');


const logFormat = winston.format.combine(
 winston.format.colorize(),
 winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
 winston.format.align(),
 winston.format.printf(
  info => `${info.timestamp} [${info.level}]: ${info.message}`,
 
),);


const transport = new DailyRotateFile({
	 filename: './/logs//' +      'homelike-%DATE%.log',
	 datePattern: 'YYYY-MM-DD',
	 zippedArchive: true,
	 maxSize: '20m',
	 maxFiles: '14d',
	 prepend: true,
//level: config.get("info"),
});


const logger = winston.createLogger({
	outputCapture: "std",
	format: logFormat,
	transports: [
		 transport,
		 new winston.transports.Console({
			   level: 'info',}),
	]
});

module.exports = logger;