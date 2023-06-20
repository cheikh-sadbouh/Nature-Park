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



const checkAuthorization = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authorization.slice(7); 

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp > currentTime) {
      next();
    } else {
      res.status(401).json({ error: "Token expired" });
    }
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

app.use("/api/parks", checkAuthorization);


app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
