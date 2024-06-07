const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  nickName: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
