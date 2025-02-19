const jwt = require("jsonwebtoken");
const User = require("../models/User");
const key = "hjsdnmsdunmm748dfmfdukmskdsfnsdhksdnmsdjk";

const generateToken = (data) => {
  const token = jwt.sign({ data }, key, { expiresIn: "1h" });
  return token;
};

const verifyToken = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "User must sign in." });
      }
  
      const withoutBearer = token.split(" ")[1];
      const payload = jwt.verify(withoutBearer, key);
      
      // Fetch user from database
      const checkUser = await User.findById(payload.data._id);
      if (!checkUser) {
        return res.status(404).json({ message: "User not found for this token." });
      }
  
      req.user = checkUser; // Attach user object
      next();
    } catch (error) {
      res.status(401).json({ Error: error.message });
    }
  };

module.exports = {
  generateToken,
  verifyToken,
};
