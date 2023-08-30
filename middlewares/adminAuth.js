const jwt = require("jsonwebtoken");
const adminAuth = async (req, res, next) => {
  try {
    console.log("Chay middleware admin");
    const accessToken = req.headers.authorization;
    console.log("accessToken in middle ", accessToken);

    const verifyToken = await jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_KEY
    );
    console.log("verify token: ", verifyToken);
    if (verifyToken.role === "admin") {
      req.user = verifyToken;
      next();
    } else {
      res
        .status(405)
        .json({ success: false, message: "Only admin can access" });
    }
  } catch (error) {
    res
      .status(405)
      .json({ success: false, message: "invalid access token", error });
  }
};

module.exports = adminAuth;
