import {format} from 'date-fns';
import fs from 'fs';
import path from 'path';
import {NextFunction, Request, Response} from "express";
const {v4: uuid} = require ('uuid');
const fsPromises = require('fs').promises;

 export const logEvents = async (message: string, logFileName: string) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    try{
        if(!fs.existsSync(path.join(__dirname,'..','..','logs'))){
          await fsPromises.mkdir(path.join(__dirname,'..','..','logs'));
        }
        await fsPromises.appendFile(path.join(__dirname,'..','..','logs',logFileName),logItem);
    }
    catch (err) {
        console.log(err)
    }
}

export const logger = (req:Request, res:Response, next:  NextFunction) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
    next();
}
