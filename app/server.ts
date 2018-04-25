/*if (process.env.NODE_ENV !== 'production') {
    require('@glimpse/glimpse').init();
}
*/

import * as express from 'express';
import * as  bodyParser from 'body-parser';

import { WelcomeRouter, CompanyRouter, ExportFileRouter, CounterRouter, UserRouter, PicConnRouter } from './controllers';
import { config } from "./config";

import mongoose = require('mongoose');

const app: express.Application = express();
app.use(bodyParser.json({ limit: '5mb' }));
app.use('/static', express.static('public'))

let port: number = 3000;

const apiVersion = 'v1';
const apiPrefix = `/api/${apiVersion}`;
const apiAdminPrefix = `/api/admin/${apiVersion}`;





app.use(`${apiPrefix}/welcome`, WelcomeRouter);
app.use(`${apiPrefix}/company`, CompanyRouter);
app.use(`${apiPrefix}/exportfile`, ExportFileRouter);
app.use(`${apiPrefix}/user`, UserRouter);
app.use(`${apiPrefix}/picconn`, PicConnRouter);

app.use(`${apiAdminPrefix}/counter`, CounterRouter);


if (process.env.PORT) {
    port = parseInt(process.env.PORT);
}

app.listen(port, () => {

    var dbURI = config[process.env.NODE_ENV || 'local']["MONGO_URI"];
    var dbOptions = {
        useMongoClient: true
    };
    mongoose.Promise = global.Promise;
    mongoose.connect(dbURI, dbOptions);

    console.log(`Listening at http://localhost:${port}/`);
});
