const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("./passport-config");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const {
  default: InternalPreviewGroup,
} = require("antd/lib/image/PreviewGroup");
require("dotenv").config();
const log_In_Model = require("./model/users");
const to_Do_Model = require("./model/toDo");

const secretAuthenticationPassword = process.env.SESSION_SECRET;

app.use(express.json());
app.use(passport.initialize());
app.use(cors());

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

app.post("/users");

app.post("/users/login", log_In_Model, async (req, res) => {});

app.listen(3001);
