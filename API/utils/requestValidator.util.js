
// const responseUtil = require("./response.util");
// const Park = require("../Models/park.model");


// const validateRequestBody = function(req, res, next) {
//     _validate(req.body)
//     .then(() => next())
//     .catch((error) => {
//         responseUtil.setResponse(process.env.CLIENT_ERROR,error.message)
//         responseUtil.sendResponse(res)
//    });
//  }

//  const _validate = function (park) {
//       const parkModel = Park.getModel();
//       const parkInstance = new parkModel(park);
//       return parkInstance.validate();
//   }
  
// module.exports = {
//    validateRequestBody
// }

