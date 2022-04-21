import { NextFunction, Request, Response } from 'express';
import {  RequestCorrelationID } from '@interfaces/errlog.interface';
import { uuid } from 'uuidv4';

const correaltionloggerMiddleware = async (req: RequestCorrelationID, res: Response, next: NextFunction) => {
  
    let correlationId = req.header['x-correlation-id'];
    if(!correlationId){
         correlationId = uuid();
        req.correlationid=correlationId;
    }
    console.log(correlationId); 
    return next();

};

export default correaltionloggerMiddleware;


