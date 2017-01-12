import mongoose = require('mongoose');

interface SplitGoodsPlacement {
    customerRef: string,
    equipmentNumber: string;
    packageQuantity: number;
    grossWeight: number;
}

let SplitGoodsPlacementSchema: mongoose.Schema = new mongoose.Schema({
    customerRef: { type: String, required: true },
    equipmentNumber: { type: String, required: true },
    packageQuantity: { type: Number, required: false },
    grossWeight: { type: Number, required: false }
}, { _id: false });


export { SplitGoodsPlacement, SplitGoodsPlacementSchema };
