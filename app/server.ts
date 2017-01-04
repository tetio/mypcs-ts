import * as express from 'express';

import { WelcomeController, CompanyController } from './controllers';
import { config } from "./config";

import mongoose = require('mongoose');

const app: express.Application = express();

const port: number = process.env.PORT || 3000;

const apiVersion = 'v1';
const apiPrefix = `/api/${apiVersion}`;
app.use(`${apiPrefix}/welcome`, WelcomeController);
app.use(`${apiPrefix}/company`, CompanyController);

app.use('/welcome', WelcomeController);

app.listen(port, () => {

    var dbURI = config[process.env.NODE_ENV || 'local']["MONGO_URI"];
    var dbOptions = {
        server: {
            socketOptions: {
                keepAlive: 1
            }
        }
    };
    mongoose.Promise = global.Promise;
    mongoose.connect(dbURI, dbOptions);

    console.log(`Listening at http://localhost:${port}/`);
});