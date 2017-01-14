import mongoose = require('mongoose');
import { Company, CompanySchema } from './company'
import { Equipment, EquipmentSchema } from './equipment'
import { Good, GoodSchema } from './good'
import { Shipment, ShipmentSchema } from './shipment'

interface BookingInfo {
    bookingNumber: string;
    requestedOn?: Date;
    notifiedOn?: Date;
}

interface FreightForwarderInfo {
    dossierReference: string;
    bookingObservations: string;
}

interface ExportFile {
    createdAt: Date;
    modifiedAt: Date;
    fileType: string;
    fileOwner: string;
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
    freightForwarderInfo: FreightForwarderInfo;
    equipments: [Equipment],
    shipments: [Shipment],
    
}

interface ExportFileModel extends ExportFile, mongoose.Document { };

let BookingInfoSchema: mongoose.Schema = new mongoose.Schema({
    bookingNumber: { type: String, required: true },
    requestedOn: { type: Date, required: false },
    notifiedOn: { type: Date, required: false }
});


let FreightForwarderInfoSchema: mongoose.Schema = new mongoose.Schema({
    dossierReference: { type: String, required: false },
    bookingObservations: { type: String, required: false }
});


let ExportFileSchema: mongoose.Schema = new mongoose.Schema({
    createdAt: { type: Date, required: true },
    modifiedAt: { type: Date, required: true },
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
    bookingInfo: { type: BookingInfoSchema, required: false },
    freightForwarderInfo: { type: FreightForwarderInfoSchema, required: false },
    equipments: { type: [EquipmentSchema], required: false },
    shipments: { type: [ShipmentSchema], required: false }
});

let ExportFileDao = mongoose.model<ExportFileModel>('ExportFile', ExportFileSchema);

export { ExportFile, BookingInfo, ExportFileDao, ExportFileModel, ExportFileSchema };
