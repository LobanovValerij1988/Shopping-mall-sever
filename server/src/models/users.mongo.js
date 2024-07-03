const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nickName: {
    type: String,
    required: [true, "nickName can not be empty"],
    unique: [true, "this {VALUE} is already existed"],
  },
  password: {
    type: String,
    required: true,
  },
  roles: [{
    type: String,
    enum: { values: ["customer",'manager',"admin"], messages: "{VALUE} is not supported" },
    default: ["customer"],
  }],
  activeStatus: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("User", userSchema);
