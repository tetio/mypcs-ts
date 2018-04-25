import { Router, Request, Response } from 'express'
import * as bodyParser from "body-parser";

import * as Controller from './router.util';
import * as CounterLogic from '../logic/counter.logic';

const router: Router = Router();

router.use(bodyParser.json());

router.get('/next/:name', (req: Request, res: Response) => {
    let {name} = req.params;
    CounterLogic.getNext(name, Controller.handleResult.bind(null, res));
});

router.post('/', (req: Request, res: Response) => {
    let payload = req.body;
    CounterLogic.create(payload.counter.name, Controller.handleResult.bind(null, res))
});


router.put('/', (req: Request, res: Response) => {
    let payload = req.body;
    let value = (payload.counter.value) ? payload.counter.value : 0;
    CounterLogic.reset(payload.counter.name, value, Controller.handleResult.bind(null, res))
});

export const CounterRouter: Router = router;
