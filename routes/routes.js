const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretAuthenticationPassword = process.env.SESSION_SECRET;

const router = express.Router();

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({ message: "Signup successful!", user: req.user });
  }
);

router.post("/login", async (req, res, next) => {
  try {
    if (err || !user) {
      const error = new Error("an error has occured");
      return next(error);
    }

    req.login(user, { session: false }, async (error) => {
      if (error) {
        return next(error);
      }
      const body = { _id: user._id, name: user.username };
      const token = jwt.sign({ user: body }, secretAuthenticationPassword);

      return res.json({ token });
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
