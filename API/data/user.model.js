const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:  {
        type: String,
        required: [true,process.env.USERNAME_MESSAGE ]
      },
    password:  {
        type: String,
        required: [true, process.env.PASSWORD_MESSAGE]
      }
  });


  mongoose.model(
    process.env.USER_DOCUMENT,
    userSchema,
    process.env.USERS_COLLECTION
  );
  
  const userModel = function () {
    return mongoose.model(process.env.USER_DOCUMENT);
  }
  module.exports = {
    getModel: userModel
  }
  