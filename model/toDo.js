const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("dotenv").config();

const dbToDoName = "userstodo";

const toDoSchema = new Schema({
  name: String,
  id: Number,
  to_Do_Item: String,
  to_Do_Completed: Boolean,
});

const to_Do_Model = mongoose.model(dbToDoName, toDoSchema);

module.exports = to_Do_Model;
