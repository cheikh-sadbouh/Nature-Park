require("dotenv").config();
require("./Configs/connectionAdapter.config").connect();
const cors = require('cors');
const jwt = require("jsonwebtoken");

const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./Routes");

const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: '1mb' }));


app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
