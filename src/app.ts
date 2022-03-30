import '@/index';
import config from 'config';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { connect, set } from 'mongoose';
// import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { dbConnection } from '@databases';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import * as OpenApiValidator from 'express-openapi-validator';
//import openapimiddleware from './middlewares/openapivalidator.middleware';


class App {
  
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`--------------------------------`);
      logger.info(`------- ENV: ${this.env} -------`);
      logger.info(`App listening on the port : ${this.port}`);
      logger.info(`--------------------------------`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }
    connect(dbConnection.url, dbConnection.options);
  }

  private initializeMiddlewares() {
    this.app.use(morgan(config.get('log.format'), { stream }));
    this.app.use(cors({ origin: config.get('cors.origin'), credentials: config.get('cors.credentials') }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.text());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(
      OpenApiValidator.middleware({
        apiSpec: './swagger.yaml',
        validateResponses: false,
       // operationHandlers: './handlers',
        // validateSecurity: {
        //   handlers: {
        //     bearerAuth(req, scopes) {
        //       return openapimiddleware.verifyToken(req)
        //     }
        //   }
        // },
      })
    )
    
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/v1', route.router);
    });
  }

  /** without openapi validator swagger */
  private initializeSwagger() {
     const specs = YAML.load('./swagger.yaml');
     this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  } 

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
