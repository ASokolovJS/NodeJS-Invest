const {Schema, model} = require('mongoose')
const months = new Schema({
    numberMonth: Number,
    titleStock: String,
    dateBuy: Date,
    costStock: Number,
    sumInvest: Number,
    costSumStock: Number,
    divident: Number,
    itemsStock: Number,
    balance: Number,
})

module.exports= model('Months', months)