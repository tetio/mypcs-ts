import mongoose = require('mongoose');


interface User {
  username: string,
  createdOn: Date,
  companyId: string;
}


// id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

