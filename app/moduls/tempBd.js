const {Schema, model, SchemaTypes} = require('mongoose')

const tempbd  = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
  },
  items: {
    type: Number,
  },
  minItems: {
    type: Number
  },
  costDiv: {
    type: Number,
  },
  divDohInYear: {
    type: Number,
  },
  summ: String

})



module.exports = model('TEMPBD', tempbd)