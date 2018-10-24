const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  emailAddress: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
