const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  googleId: String,
  email: String,
});

//this user is the name of mongodb db mongo by default created with users name by plural
module.exports = mongoose.model("user", userSchema);
