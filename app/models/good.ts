import mongoose = require('mongoose');

interface GoodPackage {
    quantity: number,
    code: string;
    description: string;
}

interface GoodTemperature {
    unit: string;
    max: number;
    min: number;
}

interface GoodVolume {
    unit: string;
    value: number;
}

interface Good {
    taricCode: string;
    description: string;
    package: GoodPackage;
    unitGrossWeight: string;
    totalGrossWeight: number;
    marks: [string];
//    temperature: GoodTemperature;
//    volume: GoodVolume;
    situation: string;
}

let GoodSchema: mongoose.Schema = new mongoose.Schema({
    taricCode: { type: String, required: true },
    description: { type: String },
    package: {
        quantity: Number,
        code: { type: String },
        description: { type: String }
    },
    unitGrossWight: { type: String },
    total_gross_weight: { type: String },
    unitNetWeight: { type: String },
    totalNetWeight: { type: String },
    marks: [{ type: String }],
    temperature: {
        unit: { type: String },
        max: Number,
        min: Number
    },
    volume: {
        unit: { type: String },
        value: Number
    },
    situation: { type: String }
}, { _id: false });

export { Good, GoodTemperature, GoodVolume, GoodPackage, GoodSchema };
