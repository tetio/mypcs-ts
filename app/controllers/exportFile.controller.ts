import { Router, Request, Response } from 'express';
import * as bodyParser from "body-parser";
import * as multer from 'multer';

import * as Controller from './controller';
import * as ExportFileLogic from '../logic/exportFile.logic';

const router: Router = Router();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'c:/tmp/uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, '' + Date.now() + '-' + file.originalname);
//     }
// });
const storage = multer.memoryStorage()
//const upload = multer({ storage: storage }).single('attachment');
const upload = multer({ storage: storage });

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

router.delete('/equipment', (req: Request, res: Response) => {
    let payload: ExportFileLogic.EquipmentPayload = req.body;
    ExportFileLogic.removeEquipment(payload, Controller.handleResult.bind(null, res));
});

router.post('/shipment/attachment', upload.single('attachment'), (req: Request, res: Response) => {
    if (req.file.buffer) {
        let shipmentId =  req.body.shipmentId;
        let exportFileId =  req.body.exportFileId;
        let contentType = req.file.originalname.split('.').slice(-1)[0]; // gets the extension of the file
        let buffer64 = req.file.buffer.toString('base64');
        ExportFileLogic.addAttachment(exportFileId, shipmentId, contentType, buffer64, Controller.handleResult.bind(null, res));
    }
});

export const ExportFileController: Router = router;
