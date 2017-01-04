
import mongoose = require('mongoose');
import { CompanySchema } from './company'
interface ExportFile {
    username: string;
    id: number;
    rounds: string[];
}





interface ExportFileModel extends ExportFile, mongoose.Document{};



var ExportFileSchema: mongoose.Schema = new mongoose.Schema({
    createdOn: {type: Date, required: true},
    modifiedOn: {type: Date, required: true},
    fileType: {type: String, required: true},
    fileOwner: {type: String, required: true},
    shippingAgent: CompanySchema,
    freightForwarder: CompanySchema,
    containerTerminal: CompanySchema,
    containerDepot: CompanySchema,
    shipper: {type: CompanySchema, required: false},
    consignee: {type: CompanySchema, required: false},
    notify: {type: CompanySchema, required: false},
    carrier: {type: CompanySchema, required: false},
    haulier: {type: CompanySchema, required: false}
});



var ExportFile = mongoose.model<ExportFileModel>('ExportFile', ExportFileSchema);



export {ExportFile, ExportFileModel,  ExportFileSchema};