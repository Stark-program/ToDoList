const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromHeader("authorization");
opts.secretOrKey = process.env.SESSION_SECRET;

passport.use(
  new JwtStrategy(opts, function (jwt_load, next) {
    const user_id = jwt_load.user_id;
    next(null, jwt_load);
  })
);

module.exports = passport;
