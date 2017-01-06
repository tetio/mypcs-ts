import * as Chance from "chance";

import { ExportFile, ExportFileDao } from '../models/exportFile';

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


export function create(fileOwner: String, bookingNumber: String, next: Function) {
        let exportFile = new ExportFileDao()//<ExportFile>{};
        exportFile.fileOwner = fileOwner;
        exportFile.createdOn = new Date();
        exportFile.modifiedOn = exportFile.createdOn;
        exportFile.bookingInfo.bookingNumber = bookingNumber;
        exportFile.save((err: any, exportFile: ExportFile) => {
            next(err, exportFile);
        });
    };