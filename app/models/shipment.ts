import mongoose = require('mongoose');
import { Company, CompanySchema } from './company';
import { SplitGoodsPlacement, SplitGoodsPlacementSchema } from './splitGoodsPlacement'
import { Good, GoodPackage, GoodSchema } from '../models/good';

interface Shipment {
  state: string;
  customerRef: string;
  name:string;
  remarks?: string;
  delegation: Company;
  attachmentId?: string;
  customer: Company;
  salesrepresentativeId?: string;
  createdAt: Date;
  updatedAt?: Date;
  createdBy: string;
  updatedBy?: string;
  goods: [Good],
  splitGoodsPlacement?: [SplitGoodsPlacement];    
}


let ShipmentSchema: mongoose.Schema = new mongoose.Schema({
  state: { type: String, required: true },
  customerRef: { type: Date, required: true },
  name: { type: String, required: true },
  remarks: { type: String, required: false },
  delegation: { type: CompanySchema, required: true },
  attachmentId: { type: String, required: false },
  customer: { type: CompanySchema, required: true },
  salesrepresentativeId: { type: String, required: false },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: false },
  createdBy: { type: String, required: true },
  updatedBy: { type: String, required: false },
  goods: { type: [GoodSchema], required: true },
  splitGoodsPlacement: { type: [SplitGoodsPlacementSchema], required: true }
});


export { Shipment, ShipmentSchema };

