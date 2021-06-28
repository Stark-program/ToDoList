const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const saltrounds = 10;

app.use(express.json());
const users = [];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.username, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
});
app.post("/bad-request", (req, res) => {
  res.status(400).send({ message: "You are missing vital credentials" });
});

app.post("/users/login", async (req, res) => {
  var user = users.find((user) => user.name == req.body.username);
  console.log(user);
  if (user == undefined) {
    return res.status(400).send({ message: "Cannot find user" });
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("success");
    } else {
      res.send("Not allowed 111");
    }
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
});

app.listen(3001);
