// const express = require("express");
// const passport = require("passport");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const secretAuthenticationPassword = process.env.SESSION_SECRET;

// const router = express.Router();

// router.post("/signup", async (req, res, next) => {
//   passport.authenticate("signup", { session: false }),
//     async (err, user, info) => {
//       return res.json({ message: "Signup successful!" + `${info}` });
//     };
// });

// router.post("/users/login", async (req, res, next) => {
//   passport.authenticate("login", async (err, user, info) => {
//     try {
//       console.log(info);
//       if (err) {
//         return next(err);
//       }
//       if (!user) {
//         return res.send({ status: 400, message: info.message });
//       }

//       req.login(user, { session: false }, async (error) => {
//         if (error) {
//           return next(error);
//         }
//         const name = req.body.username;
//         const body = { _id: user._id, name: name };
//         const token = jwt.sign({ user: body }, secretAuthenticationPassword);

//         return res.json({ status: 200, body, token });
//       });
//     } catch (error) {
//       return next(error);
//     }
//   })(req, res, next);
// });

// router.post(
//   "/users/userstodo",
//   passport.authenticate("jwt", { session: false }),
//   function (req, res) {
//     console.log(req.headers);
//     res.send(req.body);
//   }
// );

// module.exports = router;
