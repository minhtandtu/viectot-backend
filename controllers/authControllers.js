const bcrypt = require("bcryptjs");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const authController = {
  register: (registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const newpassword = await bcrypt.hash(password, 10);
    const regis = await userModel.create({
      name,
      email,
      password: newpassword,
      avatar: {
        public_id: "PUBLIC_ID",
        url: "URL",
      },
    });
    res.status(200).json({ success: true, message: "Register successfully" });
  }),
  login: (loginUser = async (req, res) => {
    const user = await userModel
      .findOne({ email: req.body.email })
      .select("+password");

    if (!user) {
      res.status(404).json({ success: false, message: "Email not Found" });
    } else {
      const checkPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!checkPassword) {
        res.status(405).json({ success: false, message: "Wrong password" });
      } else {
        const { password, ...rest } = user._doc;
        const accessToken = jwt.sign(
          { email: user.email, role: user.role },
          process.env.JWT_ACCESS_KEY,
          {
            expiresIn: "1d",
          }
        );
        const refreshToken = jwt.sign(
          { email: user.email, role: user.role },
          process.env.JWT_REFRESH_KEY,
          {
            expiresIn: "1d",
          }
        );
        res.cookie("refreshtoken", refreshToken);
        res.status(200).json({ success: true, user: rest, accessToken });
      }
    }
  }),
  // REFRESH TOKEN
  refreshTokens: async (req, res) => {
    // check if there is an accessToken

    const { refreshtoken } = req.cookies;
    console.log("refreshtoken ", refreshtoken);

    if (!refreshtoken) {
      res
        .status(401)
        .json({ success: false, message: "you need to login first" });
    }
    const decodeRefreshToken = jwt.verify(
      refreshtoken,
      process.env.JWT_REFRESH_KEY
    );
    console.log("decodeRefreshToken: ", decodeRefreshToken);

    if (!decodeRefreshToken) {
      res.status(401).json({ success: false, message: "access token invalid" });
    }

    const newAccessToken = jwt.sign(
      { email: decodeRefreshToken.email, role: decodeRefreshToken.role },
      process.env.JWT_ACCESS_KEY
    );

    const newRefreshToken = jwt.sign(
      { email: decodeRefreshToken.email, role: decodeRefreshToken.role },
      process.env.JWT_REFRESH_KEY
    );

    res.cookie("refreshtoken", newRefreshToken, { httpOnly: true });
    res.status(200).json({ accessToken: newAccessToken });
  },

  // LOG OUT
  logout: (req, res) => {
    res.clearCookie("refreshtoken");
    res.status(200).json({ success: true, message: "Logouted" });
  },
};

module.exports = authController;
