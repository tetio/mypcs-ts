import mongoose = require('mongoose');

interface GoodPackage {
    quantity: Number,
    code: String;
    description: String;
}

interface GoodTemperature {
    unit: String;
    max: Number;
    min: Number;
}

interface GoodVolume {
    unit: String;
    value: Number;
}

interface Good {
    taricCode: String;
    description: String;
    package: GoodPackage;
    unitGrossWight: String;
    total_gross_weight: String;
    unitNetWeight: String;
    totalNetWeight: String;
    marks: [{ type: String }];
    temperature: GoodTemperature;
    volume: GoodVolume;
    situation: String;
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
