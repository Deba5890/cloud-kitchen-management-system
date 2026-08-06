const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    console.log("Headers:", req.headers);

    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No Authorization Header",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("JWT Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = protect;