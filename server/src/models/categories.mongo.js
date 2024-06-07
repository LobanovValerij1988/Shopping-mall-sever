const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    virtuals: {
      id: {
        get() {
          return this._id;
        },
      },
    },
    toJSON: { virtuals: true },
  }
);

module.exports = mongoose.model("Category", categorySchema);
