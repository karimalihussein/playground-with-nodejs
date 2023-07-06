const GlobalErrorHandlerMiddleware = (err, req, res, next) => {
    const stack = process.env.NODE_ENV === 'production' ? null : err.stack;
    const message = err.message;
    const status = err.status || 'error';
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status, message, stack
    });
};


module.exports = GlobalErrorHandlerMiddleware;