const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')} at ${req.ip} by ${req.get('User-Agent')}`);
    next();
}

module.exports = logger;