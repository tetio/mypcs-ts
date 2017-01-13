import mongoose = require('mongoose');


interface User {
  username: string,
  createdOn: Date,
  companyId: string;
  roles: [UserAppRole];
}


interface UserAppRole {
  appId: string,
  roleId: string,
  createdOn: Date,
  validUntil: Date,
  createdById: string;
}


interface UserModel extends User, mongoose.Document { };

let UserSchema: mongoose.Schema = new mongoose.Schema({
  username: { type: String, required: true },
  createdOn: { type: Date, required: true },
  companyId: { type: String, required: true },
  roles: {type: [{
    appId: { type: String, required: true },
    roleId: { type: String, required: true },
    createdOn: { type: Date, required: true },
    validUntil: { type: Date, required: true },
    createdById: { type: String, required: true }    
  }], required: false} 
});


// id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },


let UserDao = mongoose.model<UserModel>('User', UserSchema);

export { User, UserAppRole, UserModel, UserDao, UserSchema };
