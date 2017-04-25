var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var models = require('./models');
var validator = require('express-validator');
var slug = require('slug');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var bcrypt = require('bcrypt-nodejs');

var index = require('./routes/index');
var users = require('./routes/users');
var hello = require('./routes/hello');
var listusers = require('./routes/listusers');
var listusersshow = require('./routes/listusersshow');
var listproducts = require('./routes/listproducts');
var createproduct = require('./routes/createproduct');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.disable('view cache');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(validator());


app.use(session({secret: 'ilovescotchscotchyscotchscotch'}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport.js')(passport);

app.use(flash());


app.use('/', index);
app.use('/users', users);
app.use('/hello', hello);
app.use('/listusers', listusers);
app.use('/listproducts', listproducts);
app.use('/createproduct', createproduct);


app.get('/login',isNew, function (req, res) {

    res.render('login.pug', {message: req.flash('loginMessage')});
});

app.get('/signup', function (req, res) {

    res.render('signup', {message: req.flash('signupMessage')});
});
app.get('/profile', isLoggedIn, function (req, res) {
    res.render('profile', {
        user: req.user.dataValues
    });
});
app.get('/check', isLoggedIn, function (req, res) {
    res.render('check', {
        user: req.user.dataValues
    });
});
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
function isNew(req, res, next) {
    if (!req.isAuthenticated())
        return next();
    res.redirect('/profile');
}
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));
app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
