import * as Chance from "chance";

import { Company, CompanyDao, PrimaryContact } from '../models/company';
import { Mongoose } from "mongoose";
import { ObjectID } from "bson";


export function findById(id: string, next: Function) {
    const _id = new ObjectID(id);
    CompanyDao.findById({ _id }, (err: any, company: Company) => {
        next(err, company);
    });
}


export function find(next: Function) {
    CompanyDao.find((err: any, companies: [Company]) => {
        next(err, companies);
    });
}

export function create(next: Function) {
    createCompany(next);
}


function createCompany(next: Function) {
    let chance = new Chance();
    let company = new CompanyDao();
    company.code = chance.state() + chance.zip();
    company.name = chance.name();
    var domain = company.name.replace(' ', '').toLocaleLowerCase() + '.com';
    company.web = 'www.' + domain;
    company.email = 'contact@' + domain;
    company.name = company.name + " Ltd.";
    company.address = chance.address();
    company.city = chance.city();
    company.region = chance.province({ full: true });
    company.country = chance.country({ full: true });
    company.postalCode = chance.postal();
    company.phone = chance.phone();
    company.fax = chance.phone();
    company.situation = 'A';
    company.lastModification = new Date();
    let first = chance.first();
    let last = chance.last();
    let contact = <PrimaryContact>{
        firstName: first,
        lastName: last,
        mobile: chance.phone(),
        email: first.toLocaleLowerCase() + '.' + last.toLocaleLowerCase() + '@' + domain
    };
    company.primaryContact = contact;
    company.save((err: any, company: Company) => {
        next(err, company);
    });
};
