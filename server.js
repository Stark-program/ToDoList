const express = require("express");
const mongoose = require("mongoose");
const app = express();

const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const passport = require("./auth/passport");
const bcrypt = require("bcrypt");
const log_In_Model = require("./model/users");
const to_Do_Model = require("./model/toDo");
// const routes = require("./routes/routes");
// const secureRoute = require("./routes/secure-routes");
const mongoPassword = process.env.REACT_APP_MONGODB_PASSWORD;
const uri = `mongodb+srv://Stark-programming:${mongoPassword}@cluster0.8nsdv.mongodb.net/Users?retryWrites=true&w=majority`;
const jwtAuth = passport.authenticate("jwt", { session: false });

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

app.post("/signup", async (req, res) => {
  user_name = req.body.username;
  pass = req.body.password;

  let hashPass = await bcrypt.hash(pass, 10);

  user = new log_In_Model({
    name: user_name,
    password: hashPass,
  });

  try {
    log_In_Model.exists({ name: user_name }, async function (err, result) {
      if (err) {
        res.send(err);
        console.log(err);
      } else if (result == true || user_name == null) {
        res.send({
          status: 409,
          message: "Username is already taken, please enter in a new username",
        });
      } else if (result == false) {
        await user.save((err, user) => {
          if (err) console.log(err);
        });
        res.status(201).send();
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/users/login", async (req, res) => {
  var user = await log_In_Model.find({ name: req.body.username });
  console.log(user);
  if (user == undefined || null) {
    return res.send({ status: 400, message: "Username could not be found" });
  }
  try {
    if (await bcrypt.compare(req.body.password, user[0].password)) {
      let body = { _id: user[0]._id, name: user[0].name };

      const token = jwt.sign(
        { user: body, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
        process.env.SESSION_SECRET
      );
      res.send({
        status: 200,
        message: "Successfully logged in",
        authorization: token,
      });
    } else {
      res.send({ status: 500, message: "Wrong Password" });
    }
  } catch (err) {
    res.send({ status: 500, message: "Wrong Username" });
    console.log(err);
  }
});

app.post("/users/userstodo", jwtAuth, async (req, res) => {
  let toDo = new to_Do_Model({
    name: req.user.user.name,
    to_Do_Item: req.body.toDo,
    to_Do_Completed: false,
  });

  to_Do_Model.exists({ to_Do_Item: req.body.toDo }, async (err, result) => {
    let task = req.body.toDo;
    if (err) {
      console.log(err);
      res.json({ message: err.message });
    } else if (result == true || task == null) {
      res.send({
        status: 409,
        message: "To_do already exists, please enter in a new to_do",
      });
    } else if (result == false) {
      await toDo.save((err, task) => {
        if (err) console.log(err);
        res.json({
          status: 200,
          task_added: task,
          message: "task successfully added",
        });
      });
    }
  });
});

app.listen(3001);
