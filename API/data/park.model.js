const mongoose = require("mongoose");

const parkAnimalsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, process.env.ANIMAL_NAME_MESSAGE]
  },
  picture: {
    type: String,
    required: [true,process.env.ANIMAL_PICTURE_MESSAGE]
  },
  description: {
    type: String,
    required: [true,process.env.ANIMAL_DESCRIPTION_MESSAGE]
  },
},
{ strict: false });

const parkSchema = new mongoose.Schema({

  parkName: {
    type: String,
    unique: true,
    required: [true,process.env.PARK_NAME_MESSAGE ]

  },
  country: {
    type: String,
    required: [true,process.env.PARK_COUNTRY_MESSAGE]
  },
  picture: {
    type: String,
    required: [true,process.env.PARK_PICTURE_MESSAGE ]
  },
  parkAnimals: {
    type: [parkAnimalsSchema],
    require: [true,process.env.PARK_ANIMALS_MESSAGE ]
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
