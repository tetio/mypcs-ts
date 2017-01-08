
import * as Chance from "chance";
import * as Promise from "bluebird";

import { ExportFile, ExportFileDao } from '../models/exportFile';
import { Company, CompanyDao } from '../models/company';
import { Equipment, EquimentEvents } from '../models/equipment';
import { Good, GoodPackage } from '../models/good';
import { SplitGoodsPlacement } from '../models/splitGoodsPlacement';

interface CriteriaExportFile {
    file_owner: String;
    booking_number: String;
    equipment_number: String;
    since: Date;
}


interface QueryCriteriaExportFile extends CriteriaExportFile {
    modified_at: any;
}




export function findByCriteria(criteria: CriteriaExportFile, next: Function) {
    let queryCriteria = <QueryCriteriaExportFile>{};
    if (criteria.file_owner !== undefined) {
        queryCriteria.file_owner = criteria.file_owner;
    }
    if (criteria.booking_number !== undefined) {
        queryCriteria['bookingInfo.bookingNumber'] = criteria.booking_number;
    }
    if (criteria.equipment_number !== undefined) {
        queryCriteria['equipments.number'] = criteria.equipment_number;
    }
    if (criteria.since !== undefined) {
        queryCriteria.modified_at = {
            $gt: criteria.since
        }
    } else {
        queryCriteria.modified_at = {
            $lt: new Date()
        };
    }
    ExportFileDao.find(queryCriteria).limit(10).exec((err: any, exportFiles: ExportFile[]) => {
        next(err, exportFiles);
    });
}


export function findById(id: String, next: Function) {
    ExportFileDao.findById(id, (err: any, exportFile: ExportFile) => {
        next(err, exportFile);
    });
};

export function find(next: Function) {
    ExportFileDao.find().limit(20).exec((err: any, exportFiles: ExportFile[]) => {
        next(err, exportFiles);
    });
};


export function create(fileOwner: string, bookingNumber: string, next: Function) {
    let exportFile = new ExportFileDao();//<ExportFile>{};
    exportFile.fileOwner = fileOwner;
    exportFile.createdOn = new Date();
    exportFile.modifiedOn = exportFile.createdOn;
    exportFile.bookingInfo.bookingNumber = bookingNumber;
    exportFile.save((err: any, exportFile: ExportFile) => {
        next(err, exportFile);
    });
};


export function createRandom(next: Function) {
    let chance = new Chance();
    let exportFile = new ExportFileDao();
    countCompanies().then((count: number) => {
        Promise.join(findOneCompany(count), findOneCompany(count), findOneCompany(count), findOneCompany(count),
            function (forwarder, shippingAgent, terminal, depot) {
                /*                    exportFile.shippingAgent = company2Nad(shippingAgent);
                                    exportFile.freightForwarder = company2Nad(forwarder);
                                    exportFile.containerTerminal = company2Nad(terminal);
                                    exportFile.containerDepot = company2Nad(depot);
                */
                exportFile.shippingAgent = shippingAgent;
                exportFile.freightForwarder = forwarder;
                exportFile.containerTerminal = terminal;
                exportFile.containerDepot = depot;


                // equipments
                var numEquip = Math.floor(Math.random() * 4) + 1;
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
                // Goods
                for (var j = 0; j < numEquip; j++) {
                    var good = <Good>{
                        id: j,
                        taricCode: '' + chance.integer({
                            min: 5000000,
                            max: 9999999
                        }),
                        description: "TEXTILES_" + j,
                        package: {
                            quantity: j + 10,
                            code: 'BR',
                            description: 'BARRIL'
                        },
                        situation: 'A',
                        splitGoodsPlacement: [],
                        unitGrossWeight: 'KG',
                        totalGrossWeight: chance.integer({
                            min: 12000,
                            max: 12999
                        }),
                        marks: ['']
                    };
                    // var sgp = {
                    //         good_id: j,
                    //         equipment_number: exportFile.equipments[j].number,
                    //         pacjage_quantity: (j + 20),
                    //         gross_weight: (22000 + (j+20) * 10),
                    //         _id: exportFile.equipments[j]._id
                    // };
                    // good.split_goods_placement.push(sgp);
                    exportFile.goods.push(good);
                }
                // split_goods_placement
                for (var k = 0; k < numEquip; k++) {
                    let sgp = <SplitGoodsPlacement>{
                        equipmentNumber: exportFile.equipments[k].number,
                        packageQuantity: (k + 20),
                        grossWeight: (22000 + (k + 20) * 10)
                    };
                    exportFile.splitGoodsPlacement.push(sgp);
                }

                exportFile.bookingInfo = {
                    bookingNumber: 'BK-' + chance.postal().replace(' ', ''),
                    requestedOn: new Date(),
                    notifiedOn: new Date(),
                };
                exportFile.createdOn = new Date();
                exportFile.modifiedOn = exportFile.createdOn;
                exportFile.fileType = 'EF_FF';
                exportFile.fileOwner = exportFile.freightForwarder.code;
                exportFile.save(function (err) {
                    if (err) {
                        next(err);
                    }
                    next(null, exportFile);
                });
            });
    });
};

function countCompanies() {
    return new Promise(function (resolve, reject) {
        CompanyDao.count({}, function (err, count) {
            if (err) {
                reject(err);
            }
            resolve(count);
        });
    });
}

function findOneCompany(count: number) {
    return new Promise(function (resolve, reject) {
        let rand = Math.floor(Math.random() * count);
        CompanyDao.findOne().skip(rand).exec(function (err, company) {
            if (err) {
                reject(err);
            }
            resolve(company);
        });
    });
}
