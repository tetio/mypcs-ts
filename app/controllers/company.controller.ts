import { Router, Request, Response } from 'express';
import * as Controller from './controller';
import * as CompanyLogic  from '../logic/company.logic';

const router: Router = Router();

router.get('/:id', (req: Request, resp: Response) => {
    let {id} = req.params;
    CompanyLogic.findById(id, Controller.handleResult.bind(null, resp));
});


router.get('/', (req: Request, resp: Response) => {
    CompanyLogic.find(Controller.handleResult.bind(null, resp));
});


router.post('/create', (req: Request, resp: Response) => {
    CompanyLogic.create(Controller.handleResult.bind(null, resp));
});


export const CompanyController: Router = router;