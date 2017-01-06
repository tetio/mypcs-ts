import mongoose = require('mongoose');

interface HazardCode {
    identificationCode: String
    additionalClassificationIdentifier: String;
    codeVersionIdentifier: String;
}

interface DangerousGood {
    hazardCode: HazardCode;
    unitedNationsIdentifier: String;
    packagingDangerLevelCode: { type: String };
    emergencyProcedureForShipsIdentifier: { type: String };
    description: { type: String };    
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