const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "category should not be empty"],
    unique: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
