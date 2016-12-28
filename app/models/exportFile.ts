
import mongoose = require('mongoose');

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
    shippingAgent: Company.companySchema,
    freightForwarder: Company.companySchema,
    containerTerminal: Company.companySchema,
    containerDepot: Company.companySchema,
    shipper: {type: Company.companySchema, required: false},
    consignee: {type: Company.companySchema, required: false},
    notify: {type: Company.companySchema, required: false},
    carrier: {type: Company.companySchema, required: false},
    haulier: {type: Company.companySchema, required: false}
});



var ExportFile = mongoose.model<ExportFileModel>('ExportFile', ExportFileSchema);



export {ExportFile, ExportFileModel,  ExportFileSchema};