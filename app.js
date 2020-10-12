const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const db = require('./util/database');

app.set('view engine','ejs');
app.set('views','views');

const adminRoutes = require('./router/admin');
const shopRoutes = require('./router/shop');
const errorController = require('./controllers/error');

db.execute('SELECT * FROM products')
    .then((result)=> {
        console.log(result);
    })
    .catch(err => {
        console.log(err)
    });

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

app.listen(3000);