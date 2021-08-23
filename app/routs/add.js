const { Router } = require("express");
const Stock = require('../moduls/stock');
const TEMPBD = require("../moduls/tempbd")
const router = Router();

router.get("/", (req, res) => {
  res.render("add", {
    title: 'Добавить акцию'
  });
});

router.post("/", async (req, res) => {
  const stock = new Stock ({
    title: req.body.title,
    price: req.body.price,
    items: req.body.items,
    minItems: req.body.minItems,
    costDiv: req.body.costDiv,
    divDohInYear: req.body.divDohInYear,
    summ: +req.body.price * req.body.items
  })
  const tempbd = new TEMPBD ({
    title: req.body.title,
    price: req.body.price,
    items: req.body.items,
    minItems: req.body.minItems,
    costDiv: req.body.costDiv,
    divDohInYear: req.body.divDohInYear,
    summ: +req.body.price * req.body.items
  })
  
  try {
    await stock.save();
    await tempbd.save()
    res.redirect('/') 
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;