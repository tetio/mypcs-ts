import mongoose = require('mongoose');
import { Company, CompanySchema } from './company'

interface Shipment {
  isactive: boolean;
  customerRef: string;
  name:string;
  remarks: string;
  delegation: string;
  attachmentId: string;
  customer: Company;
  salesrepresentativeId: string;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  updatedById: string;    
}


let ShipmentSchema: mongoose.Schema = new mongoose.Schema({
  isactive: { type: String, required: true },
  customerRef: { type: Date, required: true },
  name: { type: String, required: true },
  remarks: { type: String, required: true },
  delegationId: { type: String, required: true },
  attachmentId: { type: String, required: true },
  customer: { type: CompanySchema, required: true },
  salesrepresentativeId: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  createdBy: { type: String, required: true },
  updatedBy: { type: String, required: true }
});


export { Shipment, ShipmentSchema };

