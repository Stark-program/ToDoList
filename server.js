const express = require("express");
const mongoose = require("mongoose");
const app = express();
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./auth/auth");
const routes = require("./routes/routes");
const secureRoute = require("./routes/secure-routes");
const mongoPassword = process.env.REACT_APP_MONGODB_PASSWORD;
const uri = `mongodb+srv://Stark-programming:${mongoPassword}@cluster0.8nsdv.mongodb.net/Users?retryWrites=true&w=majority`;

const secretAuthenticationPassword = process.env.SESSION_SECRET;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connection established");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.use("/", routes);
app.use(
  "/users/login",
  passport.authenticate("jwt", { session: false }),
  secureRoute
);
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3001);
