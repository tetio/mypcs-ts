
import * as Chance from "chance";
import * as Promise from "bluebird";
import { ObjectID } from "mongodb";

import { ExportFile, ExportFileDao, BookingInfo } from '../models/exportFile';
import { Company, CompanyDao } from '../models/company';
import { Attachment, AttachmentDao } from '../models/attachment';
import { Equipment, EquimentEvents } from '../models/equipment';
import { SplitGoodsPlacement } from '../models/splitGoodsPlacement';
import { Shipment } from '../models/shipment';
import { Good, GoodPackage } from '../models/good';
import { nextValue } from './counter.logic';


export interface CriteriaExportFile {
    fileOwner: string;
    bookingNumber: string;
    equipmentNumber: string;
    since: Date;
}


interface QueryCriteriaExportFile extends CriteriaExportFile {
    modifiedAt: any;
    bookingInfo: BookingInfo;
}

export interface EquipmentPayload {
    exportFileId: string;
    equipment: Equipment;
}


export function findByCriteria(criteria: CriteriaExportFile, next: Function) {
    let queryCriteria = <QueryCriteriaExportFile>{};
    if (criteria.fileOwner !== undefined) {
        queryCriteria.fileOwner = criteria.fileOwner;
    }
    if (criteria.bookingNumber !== undefined) {
        queryCriteria.bookingInfo = <BookingInfo>{
            bookingNumber: criteria.bookingNumber
        };
    }
    if (criteria.equipmentNumber !== undefined) {
        queryCriteria.equipmentNumber = criteria.equipmentNumber;
    }
    if (criteria.since !== undefined) {
        queryCriteria.modifiedAt = {
            $gt: criteria.since
        }
    }
    let projection = {
        'fileOwner': 1,
        'modifiedAt': 1,
        'bookingInfo.bookingNumber': 1,
        'shipper.name': 1,
        'containerTerminal.name': 1,
        'freightForwarder.name': 1
    }
    ExportFileDao.find(queryCriteria, projection).limit(10).exec((err: any, exportFiles: [ExportFile]) => {
        next(err, exportFiles);
    });
}


export function findById(id: String, next: Function) {
    ExportFileDao.findById(id, (err: any, exportFile: ExportFile) => {
        next(err, exportFile);
    });
};

export function find(next: Function) {
    ExportFileDao.find().limit(20).exec((err: any, exportFiles: [ExportFile]) => {
        next(err, exportFiles);
    });
};


export function create(fileOwner: string, bookingNumber: string, next: Function) {
    Promise.join(newExportFileId(), (counterValue: number) => {
        let exportFile = new ExportFileDao();
        let now = new Date();
        let currentYear = now.getFullYear();
        exportFile.code = `EF-${currentYear}-${counterValue}`.replace(/\s+/g, '');
        exportFile.version = 0;
        exportFile.fileOwner = fileOwner;
        exportFile.createdAt = new Date();
        exportFile.modifiedAt = exportFile.createdAt;
        exportFile.bookingInfo.bookingNumber = bookingNumber;
        exportFile.save((err: any, exportFile: ExportFile) => {
            next(err, exportFile);
        });
    });
}




export function createRandom(next: Function) {
    let chance = new Chance();
    let exportFile = new ExportFileDao();
    let now = new Date();
    let currentYear = now.getFullYear();
    countCompanies().then((count: number) => {
        Promise.join(findOneCompany(count), findOneCompany(count), findOneCompany(count), findOneCompany(count), findOneCompany(count), newExportFileId(),
            (customer: Company, forwarder: Company, shippingAgent: Company, terminal: Company, depot: Company, counterValue: number) => {

                // Agents
                exportFile.shippingAgent = shippingAgent;
                exportFile.freightForwarder = forwarder;
                exportFile.containerTerminal = terminal;
                exportFile.containerDepot = depot;
                exportFile.code = `EF-${currentYear}-${counterValue}`.replace(/\s+/g, '');
                exportFile.version = 0;

                // equipments
                let numEquip = Math.floor(Math.random() * 4) + 1;
                console.log('numEquip=' + numEquip);
                for (var i = 0; i < numEquip; i++) {
                    let equipment = <Equipment>{
                        number: 'MMMU' + chance.integer({
                            min: 1000000,
                            max: 9999999
                        }),
                        reference: 'ref1',
                        type: '2200',
                        seals: ['S1', 'S2'],
                        unitGrossWeight: 'KG',
                        totalGrossWeight: chance.integer({
                            min: 13000,
                            max: 13999
                        }),
                        unitNetWeight: 'KG',
                        totalNetWeight: chance.integer({
                            min: 12000,
                            max: 12999
                        }),
                        events: <EquimentEvents>{
                            ingateEstimated: new Date(),
                            ingateDatetime: new Date(),
                            unloadedDatetime: new Date(),
                            loadedDatetime: new Date(),
                        }

                    };
                    exportFile.equipments.push(equipment);
                }
                let shipment = createShipmentRandom(1, customer, forwarder);
                // Goods only two
                for (var j = 0; j < 2; j++) {
                    let good = <Good>{
                        //id: j,
                        ref: `REF${j}`,
                        taricCode: '' + chance.integer({
                            min: 5000000,
                            max: 9999999
                        }),
                        description: `TEXTIL_${j}`,
                        package: {
                            quantity: j + 10,
                            code: 'BR',
                            description: 'BARRIL'
                        },
                        situation: 'A',
                        splitGoodsPlacement: [],
                        unitNetWeight: 'KG',
                        totalNetWeight: chance.integer({
                            min: 12000,
                            max: 12999
                        }),
                        marks: ['']
                    };
                    shipment.goods.push(good);
                }
                // split_goods_placement
                for (var k = 0; k < numEquip; k++) {
                    let sgp = <SplitGoodsPlacement>{
                        goodRef: shipment.goods[k % 2].ref,
                        equipmentNumber: exportFile.equipments[k].number,
                        packageQuantity: (k + 20),
                        grossWeight: (22000 + (k + 20) * 10)
                    };
                    shipment.splitGoodsPlacement.push(sgp);
                }
                exportFile.shipments.push(shipment);
                exportFile.bookingInfo = {
                    bookingNumber: 'BK-' + chance.postal().replace(' ', ''),
                    requestedOn: new Date(),
                    notifiedOn: new Date(),
                };
                exportFile.createdAt = new Date();
                exportFile.modifiedAt = exportFile.createdAt;
                exportFile.fileType = 'EF_FF';
                exportFile.fileOwner = exportFile.freightForwarder.code;
                exportFile.save((err: any) => {
                    if (err) {
                        next(err);
                    }
                    next(null, exportFile);
                });
            });
    });
};

function createShipmentRandom(seqNum: number, customer: Company, delegation: Company) {
    let shipment = <Shipment>{
        state: 'OPEN',
        customerRef: `G-REF-${seqNum}`,
        name: 'EINES',
        delegation: delegation,
        customer: customer,
        createdAt: new Date(),
        createdBy: 'jsmith',
        goods: [],
        splitGoodsPlacement: []
    };
    return shipment;
}


export function addEquipment(payload: EquipmentPayload, next: Function) {
    let objectId = new ObjectID(payload.exportFileId);
    let query = { _id: objectId };
    let update = { $push: { equipments: payload.equipment } };
    ExportFileDao.findOneAndUpdate(query, update, { 'new': true }, (error: any, exportFile: ExportFile) => {
        next(error, exportFile);
    });
};


export function removeEquipment(payload: EquipmentPayload, next: Function) {
    let objectId = new ObjectID(payload.exportFileId);
    let query = { _id: objectId };
    let update = {
        $pull: {
            equipments: { number: payload.equipment.number },
            splitGoodsPlacement: { equipmentNumber: payload.equipment.number }
        }
    };
    ExportFileDao.update(query, update, { 'multi': true }, (error: any, exportFile: ExportFile) => {
        next(error, exportFile);
    });
};


export function addAttachment(exportFileId: string, shipmentId: string, fileType: string, buffer64: string, next: Function) {
    let attachment = new AttachmentDao();
    attachment.file.contentType = fileExtension2contentType(fileType);
    attachment.file.data = buffer64;
    attachment.uploadedOn = new Date();
    attachment.save((err: any) => {
        if (err) {
            next(err);
        }
        next(null, { result: 'OK' });
    });
};


function countCompanies() {
    return new Promise((resolve: Promise.Resolve, reject: Promise.Resolve) => {
        CompanyDao.count({}, (err, count) => {
            if (err) {
                reject(err);
            }
            resolve(count);
        });
    });
}


function findOneCompany(count: number) {
    return new Promise((resolve: Promise.Resolve, reject: Promise.Resolve) => {
        let rand = Math.floor(Math.random() * count);
        CompanyDao.findOne().skip(rand).exec((err, company) => {
            if (err) {
                reject(err);
            }
            resolve(company);
        });
    });
}


function fileExtension2contentType(fileExtension: string): string {
    let contentType = 'text/plain';
    if (fileExtension.toLocaleUpperCase() === 'PDF') {
        contentType = 'application/pdf';
    } else if (fileExtension.toLocaleUpperCase() === 'JPG' || fileExtension.toLocaleUpperCase() === 'JPEG') {
        contentType = 'image/jpeg';
    } else if (fileExtension.toLocaleUpperCase() === 'DOC') {
        contentType = 'application/msword';
    } else if (fileExtension.toLocaleUpperCase() === 'DOCX') {
        contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else if (fileExtension.toLocaleUpperCase() === 'XLS') {
        contentType = 'application/vnd.ms-excel';
    } else if (fileExtension.toLocaleUpperCase() === 'XLSX') {
        contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    }
    return contentType;
}

function newExportFileId(): Promise {
    return nextValue('EF');
}
