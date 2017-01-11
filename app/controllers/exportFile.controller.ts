import { Router, Request, Response } from 'express';
import * as bodyParser from "body-parser";

import * as Controller from './controller';
import * as ExportFileLogic from '../logic/exportFile.logic';

const router: Router = Router();

router.use(bodyParser.json());

// router.use((req: Request, res: Response, next: Function) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

router.get('/:id', (req: Request, res: Response) => {
    let {id} = req.params;
    ExportFileLogic.findById(id, Controller.handleResult.bind(null, res));
});


router.get('/', (req: Request, res: Response) => {
    ExportFileLogic.find(Controller.handleResult.bind(null, res));
});


router.post('/find', (req: Request, res: Response) => {
    let criteria = req.body;
    ExportFileLogic.findByCriteria(criteria, Controller.handleResult.bind(null, res));
});


router.post('/create', (req: Request, res: Response) => {
    ExportFileLogic.createRandom(Controller.handleResult.bind(null, res));
});

router.post('/equipment', (req: Request, res: Response) => {
    let payload: ExportFileLogic.EquipmentPayload = req.body;
    ExportFileLogic.addEquipment(payload, Controller.handleResult.bind(null, res));
});

export const ExportFileController: Router = router;
