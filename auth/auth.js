const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const log_In_Model = require("../model/login");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
require("dotenv").config();
const secretAuthenticationPassword = process.env.SESSION_SECRET;

passport.use(
  "signup",
  new localStrategy(async (username, password, done) => {
    try {
      const user = await log_In_Model.create({ username, password });
      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

passport.use(
  "login",
  new localStrategy(async (username, password, done) => {
    try {
      const user = await log_In_Model.findOne({ name: username });

      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      const validate = await user.isValidPassword(password);

      if (!validate) {
        return done(null, false, { message: "Wrong Password" });
      }

      return done(null, user, { message: "Logged in Successfully" });
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: secretAuthenticationPassword,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
