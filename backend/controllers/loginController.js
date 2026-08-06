const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
     console.log("Login Request:", req.body);

    // Get email and password from request
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    console.log("User Found:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Debug
console.log("Entered Password:", password);
console.log("Stored Hash:", user.password);

const isMatch = await bcrypt.compare(password, user.password);

console.log("Password Match:", isMatch);

if (!isMatch) {
  return res.status(401).json({
    success: false,
    message: "Invalid password",
  });
}

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Send response
    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = loginUser;