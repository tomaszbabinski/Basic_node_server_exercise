const User = require('../models/user');

exports.getLogin = (req,res,next) => {
    // const isLoggedIn = req.get('Cookie').split('=')[1];
        res.render('auth/login',{
            path: '/login',
            pageTitle: 'Login',
            isAuthenticated: false
        });
};

exports.postLogin = (req,res,next) => {
    User.findById('5fca7e0aee225c5d702e9fcc')
    .then(user => {
        req.session.isLoggedIn = true;
        req.session.user = user;
        res.redirect('/');
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req,res,next) => {
  req.session.destroy((err) => {
      console.log(err);
      res.redirect('/');
  });
};