require('./models/db');

const express = require('express');
const path = require('path');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');

const userController = require('./controllers/user-controller');
const profileController = require('./controllers/profile-controller');
const paymentController = require('./controllers/payment-controller');

var app = express();
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json({ type: 'application/*' }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.set('views', path.join(__dirname, '/views/'));
app.engine(
  'hbs',
  exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main-layout',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    layoutsDir: __dirname + '/views/layouts/',
  })
);
app.set('view engine', 'hbs');

app.listen(3000, () => {
  console.log('Express server started at port : 3000');
});

app.use('/user', userController);
app.use('/profile', profileController);
app.use('/payment', paymentController);
