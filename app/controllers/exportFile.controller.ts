import { Router, Request, Response } from 'express';
import * as Controller from './controller';
import * as ExportFileLogic from '../logic/exportFile.logic';

const router: Router = Router();

router.get('/:id', (req: Request, res: Response) => {
    let {id} = req.params;
    ExportFileLogic.findById(id, Controller.handleResult.bind(null, res));
});


router.get('/', (req: Request, res: Response) => {
    ExportFileLogic.find(Controller.handleResult.bind(null, res));
});


router.post('/create', (req: Request, res: Response) => {
    ExportFileLogic.createRandom(Controller.handleResult.bind(null, res));
});


export const ExportFileController: Router = router;