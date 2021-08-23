const {Schema, model} = require('mongoose')

const year = new Schema({
  numberYear: Number,
  months: Object
})

module.exports= model('Year', year)