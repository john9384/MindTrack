const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating the Schema
const UserModel = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    requierd: true
  },
  password: {
    type: String,
    requierd: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("users", UserModel);
