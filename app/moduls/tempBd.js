const {Schema, model, SchemaTypes} = require('mongoose')

const tempbd  = new Schema({
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



module.exports = model('TEMPBD', tempbd)