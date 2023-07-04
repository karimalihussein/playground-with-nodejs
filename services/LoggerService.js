const winston = require('winston');
const dotenv = require('dotenv').config();

const dateFormater = () => {
    return new Date(Date.now()).toLocaleString();
}

class LoggerService {
    constructor(route) {
        this.route = route;
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: route },
            transports: [
                new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
                new winston.transports.File({ filename: 'logs/combined.log' }),
            ],
        });
        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(new winston.transports.Console({
                format: winston.format.simple(),
            }));
        }
    }

    setLogData(data) {
        this.data = data;
    }

    async info() {
        this.logger.info({
            route: this.route,
            data: this.data,
            timestamp: dateFormater(),
        });
    }

    async error() {
        this.logger.error({
            route: this.route,
            data: this.data,
            timestamp: dateFormater(),
        });
    }
}

module.exports = LoggerService;