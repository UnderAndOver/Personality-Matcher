const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  google_id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
});
module.exports = mongoose.model("User", UserSchema, "users");
