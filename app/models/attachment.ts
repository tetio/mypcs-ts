import mongoose = require('mongoose');


interface Attachment {
    attachment: {
        data: string,
        contentType: string
    },
    uploadedOn: Date,
    uploadedById: string;
}


let AttachmentSchema: mongoose.Schema = new mongoose.Schema({
    attachment: { data: Buffer, contentType: String, required: true },
    uploadedOn: { type: Date, required: true },
    uploadedById: { type: String, required: true },
});

export { Attachment, AttachmentSchema };