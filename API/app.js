require("dotenv").config();
require("./Configs/connectionAdapter.config").connect();
const cors = require('cors');

const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./Routes/index");

const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: '10mb' })); // Set the payload size limit as per your requirement
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
