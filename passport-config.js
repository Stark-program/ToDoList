var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();
var secretOrKey = process.env.SESSION_SECRET;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken("SESSION_SECRET");
opts.secretOrKey = process.env.SESSION_SECRET;
// opts.issuer = "accounts.examplesoft.com";
// opts.audience = "yoursite.net";
const initializePassport = () => {
  passport.use(
    new JwtStrategy(opts, async (token, done) => {
      console.log(1);
      try {
        console.log(2);
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    })
  );
  console.log(6);
};

module.exports = initializePassport;
