import { Request } from 'express';

  export interface RequestCorrelationID extends Request {
    correlationid: string;
  }