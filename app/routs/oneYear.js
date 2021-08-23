const { Router } = require("express");
const Stocks = require("..//moduls/stock");
const Months = require("../moduls/months");
const Year = require("../moduls/year");
const TEMPBD = require("../moduls/tempbd");
const router = Router();

router.get("/", async (req, res) => {
 
  function fullDiv(year){
    return year.reduce((acc, year) => {
      return acc += year.months.reduce((total, year) => {
          return (total += +year.divident);
        }, 0)
    },0)
  }
  function allSum(year){
    return year.reduce((acc, year) => {
      return acc += year.months.reduce((total, year) => {
          return (total += +year.costSumStock);
        }, 0)
    },0)
  }
  function allSummYear(year) {
    return lastYear.months.reduce((total, year) => {
      return (total += +year.costSumStock);
    }, 0);
  }
   function monthq(){
    if(year.length !== 0){
      if(lastYear.months.length == 0){
        return 0
      }else{
        return lastYear.months[lastYear.months.length - 1].numberMonth
      }
    }else{
      return 0
    }
    
  }
  const year = await Year.find();
  let lastYear = year[year.length - 1];
  let month = monthq(year)
  let lastNumberYear = year.length !== 0 ? lastYear.numberYear : 0

  if(year.length == 0){
    const firstYear =  new Year({
     numberYear: 1,
     months: []
   })
   await firstYear.save()
 }

  res.render("oneYear", {
    title: "1 год",
    year,
    month,
    allSummYear: allSummYear(year),
    allSum: allSum(year),
    lastYear,
    lastNumberYear,
    fullDiv: fullDiv(year),
    divInProc:((100/allSum(year)) * fullDiv(year)).toFixed(2)
  });
});


router.post("/invest", async (req, res) => {
  function getItem(tempbd) {
    let item = +((+req.body.invest + bals) / tempbd[idx].price).toFixed(0);
    let acc = 0;
    if (tempbd[idx].minItems == 1) {
      acc = item;
    } else {
      while (item % tempbd[idx].minItems !== 0) {
        --item;
        acc = item;
      }
    }
    return acc;
  }
  function getItemForArr(tempbd) {
    let item = +((+req.body.invest + bals) / tempbd.price).toFixed(0);
    let acc = 0;
    if (tempbd.minItems == 1) {
      acc = item;
    } else {
      while (item % tempbd.minItems !== 0) {
        --item;
        acc = item;
      }
    }
    return acc;
  }
  function getNumberMonths(months) {
    let month = 0;
    if (months >= 1 && months !== 12) {
      month = months + 1;
    } else {
      month = 1;
    }
    return month;
  }
  function getDiv(year){
    if(year.length > 1){
     return ((tempbd[idx].items + getItem(tempbd)) * tempbd[idx].costDiv * tempbd[idx].divDohInYear) + year[year.length - 2].months[idx].divident
    }else{ 
      return (tempbd[idx].items + getItem(tempbd)) * tempbd[idx].costDiv * tempbd[idx].divDohInYear
    }
    }
  const stocks = await Stocks.find();
  const tempbd = await TEMPBD.find();
  const year = await Year.find();
  let lastYear = year[year.length - 1];
  let bals = 0;
  let arr = tempbd.map((arrs) => {
    let itemByStock = getItemForArr(arrs);
    let divDohod = (arrs.items + itemByStock) * arrs.costDiv * arrs.divDohInYear;
    return Math.floor(+divDohod);
  });
  let idx = arr.indexOf(Math.max.apply(null, arr));

  if (lastYear.months.length !== 0 && lastYear.months[lastYear.months.length - 1].balance >= 0) {
    bals = lastYear.months[lastYear.months.length - 1].balance;
  } else {
    bals = 0;
  }

  const month = new Months({
    numberMonth: getNumberMonths(+req.body.months),
    titleStock: tempbd[idx].title,
    dateBuy: Date.now(),
    costStock: tempbd[idx].price,
    sumInvest: +req.body.invest + bals,
    costSumStock: (getItem(tempbd) * tempbd[idx].price).toFixed(2),
    divident: getDiv(year).toFixed(0),
    itemsStock: getItem(tempbd),
    balance: (+req.body.invest + bals - getItem(tempbd) * tempbd[idx].price
    ).toFixed(2),
  });

  if (lastYear.months.length == 12) {
    const newYear = new Year({
      numberYear: +req.body.title + 1,
      months: [month],
    });
    await newYear.save();
  } else {
    await Year.updateOne(
      { numberYear: req.body.title },
      { $push: { months: month } }
    );
  }

  await TEMPBD.findByIdAndDelete(tempbd[idx]);

  if (lastYear.months.length == 11){
    await TEMPBD.remove()
    await TEMPBD.insertMany(stocks)
  }else if (tempbd.length == 1) {
    await TEMPBD.insertMany(stocks)
  }


  res.redirect("/oneYear");
});

module.exports = router;
