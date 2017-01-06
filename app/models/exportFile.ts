import mongoose = require('mongoose');
import {Company, CompanySchema } from './company'
import { Equipment, EquipmentSchema } from './equipment'
import { Good, GoodSchema } from './good'
import { SplitGoodPlacement, SplitGoodPlacementSchema } from './splitGoodPlacement'

interface BookingInfo {
    bookingNumber: String;
    requestedOn: Date;
    notifiedOn: Date;    
}

interface FreightForwarderInfo {

}

interface ExportFile {
    createdOn: Date;
    modifiedOn: Date;
    fileType: String;
    fileOwner: String;
    shippingAgent: Company,
    freightForwarder: Company,
    containerTerminal: Company,
    containerDepot: Company,
    shipper: Company;
    consignee: Company;
    notify: Company;
    carrier: Company;
    haulier: Company;
    bookingInfo: BookingInfo;
    freightForwarderInfo: {
        dossierReference: { type: String, required: false },
        bookingObservations: { type: String, required: false }
    },
    equipments: [Equipment],
    goods: [Good],
    splitGoodsPlacement: [SplitGoodPlacement]
}

interface ExportFileModel extends ExportFile, mongoose.Document { };

var ExportFileSchema: mongoose.Schema = new mongoose.Schema({
    createdOn: { type: Date, required: true },
    modifiedOn: { type: Date, required: true },
    fileType: { type: String, required: true },
    fileOwner: { type: String, required: true },
    shippingAgent: CompanySchema,
    freightForwarder: CompanySchema,
    containerTerminal: CompanySchema,
    containerDepot: CompanySchema,
    shipper: { type: CompanySchema, required: false },
    consignee: { type: CompanySchema, required: false },
    notify: { type: CompanySchema, required: false },
    carrier: { type: CompanySchema, required: false },
    haulier: { type: CompanySchema, required: false },
    bookingInfo: {
        bookingNumber: { type: String, required: true },
        events: {
            requestedOn: { type: Date, required: false },
            notifiedOn: { type: Date, required: false }
        },
    },
    freightForwarderInfo: {
        dossierReference: { type: String, required: false },
        bookingObservations: { type: String, required: false }
    },
    equipments: [EquipmentSchema],
    goods: [GoodSchema],
    splitGoodsPlacement: [SplitGoodPlacementSchema]
});

let ExportFileDao = mongoose.model<ExportFileModel>('ExportFile', ExportFileSchema);

export { ExportFile, ExportFileDao, ExportFileModel, ExportFileSchema };
