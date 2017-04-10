import { Router, Request, Response } from 'express';
import * as bodyParser from "body-parser";

import * as Controller from './controller';
import * as UserLogic from '../logic/user.logic';

const router: Router = Router();
router.use(bodyParser.json());

router.use((req: Request, res: Response, next: Function) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


router.post('/', (req: Request, res: Response) => {
    let user = req.body;
    UserLogic.create(user.username, user.companyId,
    user.password, user.appRolesId, Controller.handleResult.bind(null, res));
});

router.post('/authenticate', (req: Request, res: Response) => {
    let user = req.body;
    UserLogic.authenticate(user.username, user.password, Controller.handleResult.bind(null, res));
});


export const UserController: Router = router;
