import {NextFunction, Request, Response} from "express";
import {logEvents} from "./logger";

export const errorHandler = (err: any, req: Request, res: Response, next:NextFunction ) => {
    logEvents(`${err.name}\t${err.message}\t${req.method}
                       \t${req.url}\t${req.headers.origin}`, 'errorLog.log')
    console.log(err.stack,"err");
    const status = res.status ? res.status: 500;
    res.status(status as number);
    res.json({message: err.message});
    next();
}
