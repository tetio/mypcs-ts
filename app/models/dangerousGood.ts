import mongoose = require('mongoose');

interface HazardCode {
    identificationCode: string
    additionalClassificationIdentifier: string;
    codeVersionIdentifier: string;
}

interface DangerousGood {
    hazardCode: HazardCode;
    unitedNationsIdentifier: string;
    packagingDangerLevelCode: string;
    emergencyProcedureForShipsIdentifier: string;
    description: string;    
}

let DangerousGoodSchema: mongoose.Schema = new mongoose.Schema({
    hazardCode: {
        identificationCode: { type: String },
        additionalClassificationIdentifier: { type: String },
        codeVersionIdentifier: { type: String }
    },
    unitedNationsIdentifier: { type: String },
    packagingDangerLevelCode: { type: String },
    emergencyProcedureForShipsIdentifier: { type: String },
    description: { type: String }
}, { _id: false });


export { HazardCode, DangerousGood, DangerousGoodSchema };