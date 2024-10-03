import User from "../models/User.js";
import CryptoJS from "crypto-js";
import Jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

// Register Function
export const register = async (req, res, next) => {
  const newUser = new User({
    ...req.body,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
  });

  try {
    const savedUser = await newUser.save();

    const accessToken = Jwt.sign(
      { id: savedUser._id }, // Use savedUser's _id, not User._id
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    // Set cookie with the access token
    res.cookie("accesstoken", accessToken, {
      httpOnly: true,
      secure: true, // Set to true in production
      sameSite: "None", // Allow cross-site cookies
    });

    res.status(201).json({ savedUser, accessToken });
  } catch (err) {
    next(err);
  }
};

// Login Function
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    if (originalPassword !== inputPassword) {
      return next(createError(400, "Wrong password!"));
    }

    const accessToken = Jwt.sign(
      { id: user._id },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res
      .cookie("accesstoken", accessToken, {
        httpOnly: true,
        secure: true, // Set to true in production
        sameSite: "None", // Allow cross-site cookies
      })
      .status(200)
      .json({ ...others, accessToken });
  } catch (err) {
    next(err);
  }
};

// Logout Function
export const logout = async (req, res) => {
  res
    .clearCookie("accesstoken", {
      sameSite: "None", // Allow cross-site cookies
      secure: true, // Set to true in production
    })
    .status(200)
    .send("User has been logged out.");
};
