import mongoose = require('mongoose');

interface SplitGoodPlacement {
    equipmentNumber: String;
    packageQuantity: Number;
    grossWeight: Number;
}

let SplitGoodPlacementSchema: mongoose.Schema = new mongoose.Schema({
    equipmentNumber: { type: String, required: true },
    packageQuantity: { type: Number, required: false },
    grossWeight: { type: Number, required: false }
}, { _id: false });


export { SplitGoodPlacement, SplitGoodPlacementSchema };
