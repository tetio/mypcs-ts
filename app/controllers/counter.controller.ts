import {Router, Request, Response } from 'express'
import * as Controller from './controller';
import * as CounterLogic from '../logic/counter.logic';

const router: Router = Router();

router.get('/next/:counterName', (req: Request, res: Response) => {
    let {counterName} = req.params;
    CounterLogic.getNext(counterName, Controller.handleResult.bind(null, res));
});

router.post('/', (req: Request, res: Response) => {
    let payload = req.body;
    CounterLogic.create(payload.counterName, Controller.handleResult.bind(null, res))
});


router.put('/', (req: Request, res: Response) => {
    let payload = req.body;
    let value = (payload.counter.value)? payload.counter.value : 0; 
    CounterLogic.reset(payload.counter.name, value, Controller.handleResult.bind(null, res))
});