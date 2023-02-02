const express = require("express");
const mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectID;
const app = express();

const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const passport = require("./auth/passport");
const bcrypt = require("bcrypt");
const log_In_Model = require("./model/users");
const to_Do_Model = require("./model/toDo");
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
mongoose.set("returnOriginal", false);

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
  console.log(pass);

  user = new log_In_Model({
    name: user_name,
    password: pass,
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

  if (user == undefined || null) {
    return res.send({ status: 400, message: "Username could not be found" });
  }
  try {
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (match) {
      let body = { _id: user[0]._id, name: user[0].name };
      const token = jwt.sign(
        { user: body, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
        process.env.SESSION_SECRET
      );
      res.send({
        status: 200,
        message: "Successfully logged in",
        user: user[0].name,
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
app.get("/checkAuth", jwtAuth, async (req, res) => {
  let user = req.user.user.name;

  res.status(201).send({ message: "auth validated", name: user });
  console.log("request made");
});
app.get("/users/userstodo", jwtAuth, async (req, res) => {
  let user = req.user.user.name;
  to_Do_Model.find({ name: user }, (err, data) => {
    if (err) console.log(err);
    else res.send({ status: 200, info: data });
  });
});

app.post("/users/userstodo", jwtAuth, async (req, res) => {
  let toDo = new to_Do_Model({
    name: req.user.user.name,
    to_Do_Item: req.body.to_Do_Item,
    to_Do_Completed: req.body.to_Do_Completed,
    description: req.body.description,
  });

  to_Do_Model.exists(
    { to_Do_Item: req.body.to_Do_Item, name: req.user.user.name },
    async (err, result) => {
      let task = req.body.to_Do_Item;
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
    }
  );
});
app.post("/completed", jwtAuth, async (req, res) => {
  let query = { to_Do_Item: req.body[0].to_Do_Item };
  to_Do_Model.findOneAndUpdate(
    query,
    { to_Do_Completed: true },
    function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        res
          .status(200)
          .json({ message: "item sucessfully changed to completed" });
      }
    }
  );
});
app.post("/incomplete", jwtAuth, async (req, res) => {
  let query = { to_Do_Item: req.body[0].to_Do_Item };
  to_Do_Model.findOneAndUpdate(
    query,
    { to_Do_Completed: false },
    function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        res
          .status(200)
          .json({ message: "item successfully changed to incomplete" });
      }
    }
  );
});
app.post("/deleted", jwtAuth, async (req, res) => {
  let id = req.body[0]._id;

  to_Do_Model.findByIdAndDelete(id, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ message: "item successfully deleted" });
    }
  });
});

app.listen(3001);
