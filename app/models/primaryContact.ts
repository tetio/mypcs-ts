
import mongoose = require('mongoose');

interface PrimaryContact {
      firstName: string;
      lastName: String;
      mobile?: String;
      email: String;
}

let PrimaryContactSchema: mongoose.Schema = new mongoose.Schema({
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      mobile: { type: String, required: true },
      email: { type: String, required: true },
}, { _id: false });


export { PrimaryContact, PrimaryContactSchema };
