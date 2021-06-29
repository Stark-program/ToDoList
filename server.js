const express = require("express");

const app = express();
const bcrypt = require("bcrypt");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const mongoPassword = process.env.REACT_APP_MONGODB_PASSWORD;
const uri = `mongodb+srv://Stark-programming:${mongoPassword}@cluster0.8nsdv.mongodb.net/Users?retryWrites=true&w=majority`;

app.use(express.json());
const users = [];

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbName = "Users";

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    // Use the collection "people"
    const col = db.collection("people");
    // Construct a document
    let personDocument = {
      name: { first: "Alan", last: "Turing" },
      birth: new Date(1912, 5, 23), // June 23, 1912
      death: new Date(1954, 5, 7), // June 7, 1954
      contribs: ["Turing machine", "Turing test", "Turingery"],
      views: 1250000,
    };
    // Insert a single document, wait for promise so we can read it back
    const p = await col.insertOne(personDocument);
    // Find one document
    const myDoc = await col.findOne();
    // Print to the console
    console.log(myDoc);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

// app.get("/users", (req, res) => {
//   res.json(users);
// });

// app.post("/users", async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const user = { name: req.body.username, password: hashedPassword };
//     users.push(user);
//     res.status(201).send();
//   } catch (err) {
//     res.status(500).send();
//     console.log(err);
//   }
// });
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

// app.listen(3001);
