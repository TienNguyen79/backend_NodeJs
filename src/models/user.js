const mongoose = require("mongoose");
//schema: định dạng hình thù data của chúng ta
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  city: String,
});

const User = mongoose.model("user", userSchema);

module.exports = { User };
