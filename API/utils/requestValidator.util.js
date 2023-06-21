const jwt = require("jsonwebtoken");
const responseUtil = require("./response.util");
const util = require("util");
const _jwtVerify = util.promisify(jwt.verify);


const isAuthorized = function(req, res, next) {
  const { authorization } = req.headers;

  _hasAuthorizationandStartWithBearer(authorization).catch((error) =>
    responseUtil.setResponse(process.env.NO_AUTHERIZATION_IS_ALLWOED, error)
  );

  const token = authorization.slice(process.env.SEVEN);

  _verifyToken(token)
    .then((decodedToken) => _isTokenValid(decodedToken,next))
    .catch((error) => {
      responseUtil.setResponse(process.env.CLIENT_ERROR, error);
      responseUtil.sendResponse(res);
    });


};
/******************************** PRIVATE METHODS *******************************/

function _verifyToken(token) {
  return _jwtVerify(token, process.env.JWT_SECRET);
}
const _hasAuthorizationandStartWithBearer = function (authorization) {
  return new Promise((resolve, reject) => {
    if (!authorization || !authorization.startsWith(process.env.BEARER)) {
      reject(process.env.UNAUTHORIZED);
    }
    resolve();
  });
};

const _isTokenValid = function (decodedToken,next) {
  return new Promise((resolve, reject) => {
    const currentTime = Math.floor(Date.now() / process.env.THOUSAND);
    if (decodedToken.exp > currentTime) {
      next();
    } else {
      reject(process.env.JWT_TOKEN_EXPIRE);
    }
  });
};
/******************************** PRIVATE METHODS *******************************/

module.exports = {
  isAuthorized,
};
