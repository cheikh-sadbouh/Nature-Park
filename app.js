require("dotenv").config();
require("./API/data/db").connect();
const jwt = require("jsonwebtoken");

const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./API/Routes");

const app = express();

app.use("/api", function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
   res.header('Access-Control-Allow-Headers', 'authorization ,Content-Type');
   res.header('Access-Control-Allow-Methods','DELETE');
   next()
});

app.use(bodyParser.json({ limit: '5mb' })); // animal and park picture are being converted to base64 and its size excced the default http size limit


app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
