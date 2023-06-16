require("dotenv").config();
require("./Configs/connectionAdapter.config").connect();

const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./Routes/index");

const app = express();
app.use(bodyParser.json());
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
