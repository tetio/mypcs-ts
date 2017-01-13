
import mongoose = require('mongoose');

import { PrimaryContact, PrimaryContactSchema } from './primaryContact'

interface Company {
    code: string;
    name: string;
    web: string;
    email: string;
    address: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    phone: string;
    fax: string;
    situation: string;
    lastModification: Date;
    primaryContact: PrimaryContact;
    users?: [string]
}

interface CompanyModel extends Company, mongoose.Document{};



let CompanySchema: mongoose.Schema = new mongoose.Schema({
    code: {type: String, required: true},
    name: {type: String, required: true},
    web: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    region: {type: String, required: false},
    postalCode: {type: String, required: true},
    country: {type: String, required: true},
    phone: {type: String, required: true},
    fax: {type: String, required: false},
    situation: {type: String, required: true},
    lastModification: {type: Date, required: true},
    primaryContact: PrimaryContactSchema,
    users: {type: [String], required: false},
});



let CompanyDao = mongoose.model<CompanyModel>('Company', CompanySchema, 'company');



export {Company, CompanyDao, CompanyModel, CompanySchema};