const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoConnect = require('./util/database').mongoConnect;
const errorController = require('./controllers/error');

const app = express();

app.set('view engine','ejs');
app.set('views','views');

const adminRoutes = require('./router/admin');
// const shopRoutes = require('./router/shop');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next) => {
    next();
});

app.use('/admin',adminRoutes);
// app.use(shopRoutes);
app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3000);
});
