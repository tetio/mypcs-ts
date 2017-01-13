import mongoose = require('mongoose');


interface Application {
  name: string,
  description: string,
  createdOn: Date,
  createdById: string;
  roles: [ApplicationRole];
}


interface ApplicationRole {
  code: string,
  createdOn: Date,
  createdById: string;
}


interface ApplicationModel extends Application, mongoose.Document { };

let ApplicationSchema: mongoose.Schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdOn: { type: Date, required: true },
  createdById: { type: String, required: true },
  roles: {type: [{
    roleId: { type: String, required: true },
    createdOn: { type: Date, required: true },
    createdById: { type: String, required: true }    
  }], required: false} 
});


// id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },


let ApplicationDao = mongoose.model<ApplicationModel>('User', ApplicationSchema);

export { Application, ApplicationRole, ApplicationDao, ApplicationSchema };