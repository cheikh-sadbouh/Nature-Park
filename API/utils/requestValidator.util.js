const jwt = require("jsonwebtoken");
const responseUtil = require("./response.util");

const isAuthorized = (req, res, next) => {
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
  
  
module.exports = {
    isAuthorized
    }