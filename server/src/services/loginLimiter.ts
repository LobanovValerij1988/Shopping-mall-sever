import rateLimit from 'express-rate-limit';
import {logEvents} from "./logger";


export const loginLimiter = rateLimit({
    windowMs: 60*1000, // minute
    max: 5, //Limit each IP to 5 login requests per 'window' per minute
    message: {
        message: 'Too many login attempts for this IP, please try again after a 60 second pause',
    },
    handler: (req, res,next, options) => {
        logEvents(`Too many requests: ${options.message.message}\t${req.method}\t${req.url}\t
        ${req.headers.origin}`, 'errorLog.log');
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true, // Return rate limit info in the 'RateLimit-*' headers
    legacyHeaders: false // Disable the 'X-RateLimit-*' headers
});