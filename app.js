const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


app.set('view engine','ejs');
app.set('views','views');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const User = require('./models/user');
const Product = require('./models/product')

const adminRoutes = require('./router/admin');
const shopRoutes = require('./router/shop');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

 Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
 User.hasMany(Product);

sequelize.sync({force: true}).then(result => {
    // console.log(result)
    app.listen(3000);
}).catch(err => {
    console.log(err)
});
