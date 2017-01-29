import * as Chance from "chance";
import * as Promise from "bluebird";
import { ObjectID } from "mongodb";

import { Counter, CounterDao } from "../models/counter";


export function create(name: string, next: Function) {
    let counter = new CounterDao();
    counter.name = name;
    counter.value = 0;
    counter.save((err: any, aCounter: Counter) => {
        next(err, aCounter);
    });
}

export function getNext(name: string, next: Function) {
    let query = { name: name };
    let update = {
        $inc: { value: 1 }
    };
    CounterDao.findOneAndUpdate(query, update, { 'new': true }, (err: any, aCounter: Counter) => {
        next(err, aCounter);
    });
}

export function reset(name: string, value: number = 0, next: Function) {
    let query = { name: name };
    let update = { value: value };
    CounterDao.findOneAndUpdate(query, update, { 'new': true }, (err: any, aCounter: Counter) => {
        next(err, aCounter);
    });
}

export function nextValue(name: string): Promise {
    return new Promise((resolve: Promise.Resolve, reject: Promise.Resolve) => {
        let query = { name: name };
        let update = {
            $inc: { value: 1 }
        };
        CounterDao.findOneAndUpdate(query, update, { 'new': true }, (err: any, aCounter: Counter) => {
            if (err) {
                reject(err);
            }
            resolve(aCounter.value);
        });
    });
}