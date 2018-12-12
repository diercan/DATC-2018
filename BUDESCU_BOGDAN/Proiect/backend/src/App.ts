import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import { AppRouter } from './AppRouter';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*'); 
        res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        if(req.method === 'OPTIONS'){
            res.status(200).send();
        } else {
            next();
        }
    });
  }

  // Configure API endpoints.
  private async routes() {
    let appRoutes = new AppRouter();
    appRoutes.initRoutes();
    this.express.use('/', appRoutes.router);
  }

}

export default new App().express;