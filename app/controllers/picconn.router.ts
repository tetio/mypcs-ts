import { Router, Request, Response } from 'express'
import * as bodyParser from "body-parser";

import * as Controller from './router.util';


const router: Router = Router();

router.use(bodyParser.json());


router.post('/authenticate', (req: Request, res: Response) => {
    let payload = req.body;
    Controller.handleResult(res, null, { 'token': 'CAFEBABECACADELAVAKA' });
});


router.post('/sendmessage', (req: Request, res: Response) => {
    let payload = req.body;
    console.log('inside sendmessage')
    Controller.handleResult(res, null, { 'trackId': 101203553 });
});

router.post('/messagestatus', (req: Request, res: Response) => {
    let payload = req.body;
    if (Math.random() * 100 > 35) {
        console.log('inside messagestatus OKMO');
        Controller.handleResult(res, null, { 'status': 'OKMO' });
    } else {
        console.log('inside messagestatus OKLB');
        Controller.handleResult(res, null, { 'status': 'OKLB' });
    }
});


router.post('/dbscript', (req: Request, res: Response) => {
    let payload = req.body;
    console.log('inside dbscript OK');
    Controller.handleResult(res, null, { 'status': 'OK' });
});
export const PicConnRouter: Router = router;