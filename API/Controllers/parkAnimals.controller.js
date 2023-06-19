const responseUtil = require("../utils/response.util");
const parkUtil = require("../utils/park.util");
const Park = require("../Models/park.model");

const addOne = (req, res) => {
  const parkId = req.params.parkId;
  const newAnimal = req.body;

  Park.getModel()
    .findById(parkId)
    .then((park) => parkUtil.isParkFound(park))
    .then((park) => _addOne(park, newAnimal))
    .then((addedAnimal) =>
      responseUtil.setResponse(process.env.OK, addedAnimal)
    )
    .catch((error) =>
      responseUtil.setResponse(process.env.SERVER_INTERNAL_ERROR, error)
    )
    .finally(() => responseUtil.sendResponse(res));
};

const deleteOne = (req, res) => {
  const parkId = req.params.parkId;
  const animalId = req.params.animalId;
  Park.getModel()
    .findById(parkId)
    .then((park) => parkUtil.isParkFound(park))
    .then((park) => _isAnimalFound(park, animalId))
    .then(() => _deleteOne(parkId, animalId))
    .then(() =>
      responseUtil.setResponse(
        process.env.OK,
        process.env.ANIMAL_HAS_BEEN_DELETED
      )
    )
    .catch((error) =>
      responseUtil.setResponse(process.env.SERVER_INTERNAL_ERROR, error)
    )
    .finally(() => responseUtil.sendResponse(res));
};

const getAll = (req, res) => {
  const defaultParams = {
    offset: parseFloat(process.env.DEFAULT_FIND_OFFSET, process.env.BASE_TEN),
    count: parseFloat(process.env.DEFAULT_FIND_COUNT, process.env.BASE_TEN),
  };

  parkUtil
    .hasQueryString(req)
    .then((hasQueryStringResult) =>
      parkUtil.hasParams(hasQueryStringResult, req.query)
    )
    .then((queryParams) => parkUtil.isNotNumber(queryParams))
    .then((queryParams) =>
      parkUtil.updateOffsetAndCount(queryParams, defaultParams)
    )
    .then(() => {
      Park.getModel()
        .findById(req.params.parkId)
        .skip(defaultParams.offset)
        .limit(defaultParams.count)
        .then((parks) =>
          responseUtil.setResponse(process.env.OK, parks.parkAnimals)
        )
        .catch((error) =>
          responseUtil.setResponse(process.env.SERVER_INTERNAL_ERROR, error)
        );
    })
    .catch((err) => responseUtil.setResponse(err.status, err.message))
    .finally(() => responseUtil.sendResponse(res));
};

const getOne = (req, res) => {
  const parkId = req.params.parkId;
  const animalId = req.params.animalId;

  console.log("parkId",parkId);
  console.log("animalId",animalId);
  Park.getModel()
    .findById(parkId)
    .then((park) => parkUtil.isParkFound(park))
    .then((park) => _isAnimalFound(park, animalId))
    .then((animal) => responseUtil.setResponse(process.env.OK, animal.foundAnimal))
    .catch((error) =>
      responseUtil.setResponse(process.env.SERVER_INTERNAL_ERROR, error)
    )
    .finally(() => responseUtil.sendResponse(res));
};

const partialUpdate = function (req, res) {
  return _update(req, res);
};
const fullUpdate = function (req, res) {
  return _update(req, res);
};

/******************************** PRIVATE METHODS *******************************/
const _deleteOne = function (parkId, animalId) {
  return Park.getModel().findByIdAndUpdate(
    parkId,
    { $pull: { parkAnimals: { _id: animalId } } },
    { new: true }
  );
};
const _updateOne = function (parkAndAnimal, newAnimal) {
  console.log("_updateOne", parkAndAnimal, newAnimal);
  parkAndAnimal.foundAnimal.set(newAnimal);
  return parkAndAnimal.park.save();
};

const _update = (req, res) => {
  const parkId = req.params.parkId;
  const animalId = req.params.animalId;
  const newAnimal = req.body;

  Park.getModel()
    .findById(parkId)
    .then((park) => parkUtil.isParkFound(park))
    .then((park) => _isAnimalFound(park, animalId))
    .then((parkAndAnimal) => _updateOne(parkAndAnimal, newAnimal))
    .then((updatedAnimal) =>
      responseUtil.setResponse(process.env.OK, updatedAnimal)
    )
    .catch((error) =>
      responseUtil.setResponse(process.env.SERVER_INTERNAL_ERROR, error)
    )
    .finally(() => responseUtil.sendResponse(res));
};

const _isAnimalFound = function (park, animalId) {
  console.log("_isAnimalFound");
  return new Promise((resolve, reject) => {
    const foundAnimal = park.parkAnimals.find(
      (animal) => animal._id.toString() == animalId
    );

    if (!foundAnimal) {
      console.log("Animal not found in the park");
      reject(process.env.ANIMAL_NOT_FOUND);
    }
    resolve({ foundAnimal, park });
  });
};

const _addOne = function (park, newAnimal) {
  console.log(newAnimal);
  park.parkAnimals.push(newAnimal);
  return park.save();
};

/******************************** PRIVATE METHODS *******************************/

module.exports = {
  addOne,
  getAll,
  getOne,
  partialUpdate,
  fullUpdate,
  deleteOne,
};
