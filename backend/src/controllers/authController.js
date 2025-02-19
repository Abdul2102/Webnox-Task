const bcrypt = require("bcryptjs");
const { generateToken } = require("../middleware/authToken");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const findEmail = await User.findOne({ email });

    if (findEmail)
      return res.status(400).json({ Message: "Email already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(200).json({
      Message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findEmail = await User.findOne({ email });

    if (!findEmail) {
      return res.status(404).json({ Message: "Email not registered.." });
    }
    const isPasswordValid = await bcrypt.compare(password, findEmail.password);
    if (!isPasswordValid) {
      return res.status(401).json({ Message: "Invalid Password.." });
    }
    const token = generateToken({ findEmail });
    res.status(200).json({ Message: "Logged in successfully", token, findEmail });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
    try {
        const { _id } = req.params;
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ Message: "User not found" });
        }
        res.status(200).json({
            Message: "User found successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    register,
    login,
    getUser
}
