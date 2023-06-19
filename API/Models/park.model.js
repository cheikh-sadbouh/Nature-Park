const mongoose = require("mongoose");

const parkAnimalsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, " Animal name is required "]
  },
  picture: {
    type: String,
    required: [true, "Animal picture is required "]
  },
  description: {
    type: String,
    required: [true, " Animal description is required "]
  },
},
{ strict: false });

const parkSchema = new mongoose.Schema({
  // _id: {
  //   type : mongoose.Schema.Types.ObjectId,
  //   required:false
  // }, // Include _id field with ObjectId type
  parkName: {
    type: String,
    unique: true,
    required: [true, " park Name is required "]

  },
  country: {
    type: String,
    required: [true, " park country is required "]
  },
  picture: {
    type: String,
    required: [true, " Park picture is required "]
  },
  parkAnimals: {
    type: [parkAnimalsSchema],
    require: [true, " park Animals is required "]
  },
},
{ strict: false });

mongoose.model(
  process.env.PARK_DOCUMENT,
  parkSchema,
  process.env.NATUREPARK_COLLECTION
);

const parkModel = function () {
  return mongoose.model(process.env.PARK_DOCUMENT);
}
module.exports = {
  getModel: parkModel
}
