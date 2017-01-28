import mongoose = require('mongoose');

interface Counter {
    name: string,
    value: number
}

interface CounterModel extends Counter, mongoose.Document { };


let CounterSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, required: true }
});

let CounterDao = mongoose.model<CounterModel>('Counter', CounterSchema);

export { Counter, CounterDao }