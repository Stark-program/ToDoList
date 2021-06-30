const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bcrypt = require("bcrypt");
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
const db = mongoose.connection;
const logInSchema = new Schema({
  name: String,
  password: String,
});
const log_In_Model = mongoose.model("users", logInSchema);

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connection established");
});

app.get("/users", (req, res) => {
  let test = log_In_Model.find({});
  console.log(test);
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
    if (name_user != null) {
      user.save((err, user) => {
        if (err) console.log(err);
        console.log(user);
      });
    }

    res.status(201).send();
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
});
// app.post("/bad-request", (req, res) => {
//   res.status(400).send({ message: "You are missing vital credentials" });
// });

// app.post("/users/login", async (req, res) => {
//   var user = users.find((user) => user.name == req.body.username);
//   console.log(user);
//   if (user == undefined || null) {
//     return res.send({ status: 400, message: "Username or password is wrong" });
//   }
//   try {
//     if (await bcrypt.compare(req.body.password, user.password)) {
//       res.send({ status: 200, message: "Successfully logged in" });
//     } else {
//       res.send("Not allowed 111");
//     }
//   } catch (err) {
//     res.status(500).send();
//     console.log(err);
//   }
// });

app.listen(3001);
