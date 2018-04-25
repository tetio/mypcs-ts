import { Router, Request, Response } from 'express';
import * as Controller from './router.util';
import * as CompanyLogic from '../logic/company.logic';

const router: Router = Router();

router.get('/:id', (req: Request, res: Response) => {
    let { id } = req.params;
    CompanyLogic.findById(id, Controller.handleResult.bind(null, res));
});


router.get('/', (req: Request, res: Response) => {
    CompanyLogic.find(Controller.handleResult.bind(null, res));
});


router.post('/create', (req: Request, res: Response) => {
    CompanyLogic.create(Controller.handleResult.bind(null, res));
});


export const CompanyRouter: Router = router;
