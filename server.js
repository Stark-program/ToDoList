const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bcrypt = require("bcrypt");
const {
  default: InternalPreviewGroup,
} = require("antd/lib/image/PreviewGroup");
require("dotenv").config();
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mongoPassword = process.env.REACT_APP_MONGODB_PASSWORD;
const uri = `mongodb+srv://Stark-programming:${mongoPassword}@cluster0.8nsdv.mongodb.net/Users?retryWrites=true&w=majority`;

app.use(express.json());

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const dbName = "Users";
const dbToDoName = "userstodo";
const db = mongoose.connection;
const logInSchema = new Schema({
  name: String,
  password: String,
});
const toDoSchema = new Schema({
  name: String,
  id: Number,
  to_Do_Item: String,
  to_Do_Completed: Boolean,
});
const log_In_Model = mongoose.model(dbName, logInSchema);
const to_Do_Model = mongoose.model(dbToDoName, toDoSchema);

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connection established");
});

app.get("/users", (req, res) => {
  let test = log_In_Model.find({});
});

app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let name_user = req.body.username;
    let pass = hashedPassword;
    const user = new log_In_Model({
      name: name_user,
      password: pass,
    });
    log_In_Model.exists({ name: name_user }, function (err, result) {
      if (err) {
        res.send(err);
        console.log(err);
      } else if (result == true || name_user == null) {
        res.send({
          status: 409,
          message: "Username is already taken, please enter in a new username",
        });
      } else if (result == false) {
        user.save((err, user) => {
          if (err) console.log(err);
          console.log(user);
        });
        res.status(201).send();
      }
    });
  } catch (err) {
    res.status(500).send();
    console.log(err);
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
      res.send({ status: 200, message: "Successfully logged in" });
    } else {
      res.send({ status: 500, message: "Wrong Password" });
    }
  } catch (err) {
    res.send({ status: 500, message: "Wrong Username" });
    console.log(err);
  }
});
app.post("/users/userstodo", (req, res) => {
  const task = req.body[0].task;
  const completed = req.body[0].completed;
  const _id = req.body[0].id;
  const newToDo = new to_Do_Model({
    id: _id,
    to_Do_Item: task,
    to_Do_Completed: completed,
  });
  to_Do_Model.exists({ to_Do_Item: task }, function (err, result) {
    if (err) {
      res.send(err);
      console.log(err);
    } else if (result == true || task == null) {
      res.send({
        status: 409,
        message: "Task is already assigned",
      });
    } else if (result == false) {
      newToDo.save((err, newToDo) => {
        if (err) console.log(err);
        console.log(newToDo);
      });
      res.status(201).send();
    }
  });
});

app.listen(3001);
