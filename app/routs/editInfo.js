const {Router} = require('express');
const Stock = require('../moduls/stock');
const router = Router()

router.get('/:id', async (req, res) =>{
  const stocks = await Stock.findById(req.params.id);

  res.render('editInfo', {
    title: `Информация по ${stocks.title}`,
    stocks
  })
})

router.post('/edit', async (req, res) =>{
  const id = req.body.id
  delete req.body.id
  req.body.summ = req.body.price * req.body.items
  await Stock.findByIdAndUpdate(id, req.body)
  res.redirect('/')
})

router.post('/remove', async (req, res) =>{
  const id = req.body.id
  delete req.body.id
  await Stock.findByIdAndDelete(id)
  res.redirect('/')
})

module.exports = router