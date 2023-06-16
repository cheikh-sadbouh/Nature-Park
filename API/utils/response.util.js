const response = {
  message: {},
  status: 200,
}

const setResponse = function (status, message)  {
  response.message = message;
  response.status = status;
}
const sendResponse = function (res) {
  res.status(response.status).json(response.message);
}
module.exports = {
  sendResponse,
  setResponse
}
