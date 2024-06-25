import express, { Express } from 'express';
import cors from 'cors';

import UserController from './../../controller/UserController';
import InventoryController from './../../controller/InventoryController';

export const BaseRoute = 'wayne';

export class HttpServer {
  app: Express;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use(`/${BaseRoute}/user`, UserController);
    this.app.use(`/${BaseRoute}/inventory`, InventoryController);
  }

  start(port: number) {
    this.app.listen(port, () => console.log(`server started at ${port}`));
  }
}
