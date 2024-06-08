const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  nickName: {
    type: String,
    required: [true, "nickName can not be empty"],
    unique: [true, "this {VALUE} is already existed"],
  },
  role: {
    type: String,
    enum: { values: ["user", "admin"], messages: "{VALUE} is not supported" },
    required: [true, "You should add user's role"],
  },
});

module.exports = mongoose.model("Customer", customerSchema);
