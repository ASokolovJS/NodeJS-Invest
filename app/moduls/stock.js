const { Schema, model, SchemaTypes } = require("mongoose");
const stock = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: Number,
  items: Number,
  minItems: Number,
  сostDiv: Number,
  divDohInYear: Number,
  summ: String,
});

module.exports = model("Stock", stock);
