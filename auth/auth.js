const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const log_In_Model = require("../model/users");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
require("dotenv").config();
const secretAuthenticationPassword = process.env.SESSION_SECRET;

passport.use(
  "signup",
  new localStrategy(
    { usernameField: "username", passwordField: "password" },
    async (username, password, done) => {
      try {
        const user = await log_In_Model.create({
          name: username,
          password: password,
        });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    { usernameField: "username", passwordField: "password" },
    async (username, password, done) => {
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
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: secretAuthenticationPassword,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("Authorization"),
    },
    async (token, done) => {
      console.log(token);
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
        console.log(error);
      }
    }
  )
);
