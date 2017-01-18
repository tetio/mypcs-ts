import mongoose = require('mongoose');


interface Attachment {
    file: {
        data: string,
        contentType: string
    },
    uploadedOn: Date
}

interface AttachmentModel extends Attachment, mongoose.Document { };

let AttachmentSchema: mongoose.Schema = new mongoose.Schema({
    file: { data: Buffer, contentType: String},
    uploadedOn: { type: Date, required: true }
});

let AttachmentDao = mongoose.model<AttachmentModel>('Attachment', AttachmentSchema);

export { Attachment, AttachmentSchema, AttachmentDao };