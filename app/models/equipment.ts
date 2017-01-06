import mongoose = require('mongoose');

interface EquimentEvents {
    ingateEstimated: Date;
    ingateDatetime: Date;
    unloadedDatetime: Date;
    loadedDatetime: Date;
}

interface EquimentReeferInfo {
    airFlowVolume: { type: String },
    co2Level: { type: String },
    n2Level: { type: String },
    o2Level: { type: String },
    humidityPercentage: { type: String },
    ventsTerminal: { type: String },
    ventsDepot: { type: String },
}

interface Equipment {
    number: { type: String, required: true },
    reference: { type: String },
    type: { type: String },
    seals: [{ type: String }],
    unitGrossWight: { type: String },
    totalGrossWeight: { type: Number },
    unitNetWeight: { type: String },
    totalNetWeight: { type: Number },
    events: EquimentEvents,
    reefer_info: EquimentReeferInfo;

}

let EquipmentSchema: mongoose.Schema = new mongoose.Schema({
    number: { type: String, required: true },
    reference: { type: String },
    type: { type: String },
    seals: [{ type: String }],
    unitGrossWight: { type: String },
    totalGrossWeight: { type: Number },
    unitNetWeight: { type: String },
    totalNetWeight: { type: Number },
    events: {
        ingateEstimated: { type: Date },
        ingateDatetime: { type: Date },
        unloadedDatetime: { type: Date },
        loadedDatetime: { type: Date }
    },
    reefer_info: {
        airFlowVolume: { type: String },
        co2Level: { type: String },
        n2Level: { type: String },
        o2Level: { type: String },
        humidityPercentage: { type: String },
        ventsTerminal: { type: String },
        ventsDepot: { type: String }
    }
}, { _id: false });

export { Equipment, EquimentEvents, EquimentReeferInfo, EquipmentSchema };
