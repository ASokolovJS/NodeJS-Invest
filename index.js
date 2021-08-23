const express = require("express");
const mongoose = require('mongoose');
const newHBS = require("handlebars");
const path = require('path');
const Handlebars = require("express-handlebars");
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access");
const homeRout = require('./app/routs/home')
const addRout = require('./app/routs/add');
const editInfo = require('./app/routs/editInfo');
const oneYear = require('./app/routs/oneYear');

const app = express();
app.use(express.urlencoded({extended: true}));
const hbs = Handlebars.create({
  defaultLayout: "main",
  extname: "hbs",
  handlebars: allowInsecurePrototypeAccess(newHBS),
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./app/pages");
app.use(express.static(path.join(__dirname, "public")));

app.use('/', homeRout)
app.use('/add', addRout)
app.use('/editInfo', editInfo)
app.use('/oneYear', oneYear)


const PORT = process.env.PORT || 3000;
const mongoUrl = `mongodb+srv://Alex:90Q5ESV1OxrhP34K@data.1vpwv.mongodb.net/invest?retryWrites=true&w=majority`



async function start() {
  try {
    await mongoose.connect(mongoUrl,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    })

    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
start();
