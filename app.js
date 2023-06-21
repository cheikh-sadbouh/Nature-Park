require("dotenv").config();
require("./API/data/db").connect();
const jwt = require("jsonwebtoken");

const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./API/Routes");

const app = express();

// app.use(process.env.API, function(req, res, next) {
//   res.header(process.env.ACCESS_CONTROL_ALLOW_ORIGIN, process.env.ALLOW_ORIGIN);
//    res.header(process.env.ACCESS_CONTROL_ALLOW_HEADERS, process.env.ALLOW_HEADERS);
//    res.header(process.env.ACCESS_CONTROL_ALLOW_METHODS,process.env.ALLOW_METHODS);
//    next()
// });

app.use(bodyParser.json({ limit: process.env.SIZE_LIMIT })); // animal and park picture are being converted to base64 and its size excced the default http size limit


app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(process.env.SERVER_STARTED_ON + process.env.PORT);
});
