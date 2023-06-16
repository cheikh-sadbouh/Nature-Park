const responseUtil = require("../utils/response.util");
const parkUtil = require("../utils/park.util");
const Park = require("../Models/park.model");


const addOne = (req, res) => {
    _addOneRequestBodyValidator(req.body)
    .then(() => Park.getModel().create(req.body))
    .then((park) => responseUtil.setResponse(process.env.OK,park))
    .catch((error) => responseUtil.setResponse(process.env.SERVER_INTERNAL_ERROR,error))
    .finally(()=> responseUtil.sendResponse(res));
}

const getAll = (req, res) => {
  const defaultParams = {
     offset: parseFloat(process.env.DEFAULT_FIND_OFFSET, process.env.BASE_TEN),
     count: parseFloat(process.env.DEFAULT_FIND_COUNT, process.env.BASE_TEN)
  }

 
  parkUtil.hasQueryString(req)
      .then((hasQueryStringResult) =>  parkUtil.hasParams(hasQueryStringResult,req.query))
      .then((queryParams) =>  parkUtil.isNotNumber(queryParams))
      .then((queryParams) =>  parkUtil.updateOffsetAndCount(queryParams,defaultParams))
      .then(() => {
        Park.getModel().find().skip(defaultParams.offset).limit(defaultParams.count)
          .then((parks) => responseUtil.setResponse(process.env.OK, parks))
          .catch((error) => responseUtil.setResponse(process.env.SERVER_INTERNAL_ERROR, error))   
      })
      .catch((err) =>  responseUtil.setResponse(err.status,err.message))
      .finally(() => responseUtil.sendResponse(res));
}

const getOne = (req, res) => {
  const parkId = req.params.id;

     Park.getModel().findById(parkId)
    .then((park) => parkUtil.isParkFound(park))
    .then((parks) => responseUtil.setResponse(process.env.OK, parks))
    .catch((error) => responseUtil.setResponse(process.env.SERVER_INTERNAL_ERROR, error))   
    .finally(()=> responseUtil.sendResponse(res));
}

const partialUpdate =  function  (req, res) {
  return _updateOne(req.params.id, req.body,res);
}
const fullUpdate = function (req, res,) {
  return _updateOne(req.params.id, req.body,res);
}


const deleteOne = (req, res) => {
  const parkId = req.params.id;
 
  Park.getModel()
    .findByIdAndRemove(parkId)
    .then((park) => parkUtil.isParkFound(park))
    .then((park) => responseUtil.setResponse(process.env.OK, park))
    .catch((error) => responseUtil.setResponse(process.env.SERVER_INTERNAL_ERROR, error))   
    .finally(()=> responseUtil.sendResponse(res));
}




/******************************** PRIVATE METHODS *******************************/

function _updateOne(parkId, park,res) {
  Park.getModel()
   .findOneAndUpdate({ _id: parkId }, park, { new: true })
   .then((park) => parkUtil.isParkFound(park))
   .then((park) => responseUtil.setResponse(process.env.OK, park))
   .catch((error) => responseUtil.setResponse(process.env.SERVER_INTERNAL_ERROR, error))   
   .finally(()=> responseUtil.sendResponse(res))
 }
 

const _addOneRequestBodyValidator = function (park) {
  const parkModel = Park.getModel();
  const parkInstance = new parkModel(park);
  return parkInstance.validate();
}
/******************************** PRIVATE METHODS *******************************/





module.exports = {
  addOne,
  getAll,
  getOne,
  partialUpdate,
  fullUpdate,
  deleteOne
}




