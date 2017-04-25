var express = require('express');
var models = require('../models');
var slug = require('slug');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

    res.render('login', {title: 'login'});
});
router.post('/', function (req, res, next) {
    models.users.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    })
        .then(function (t) {
            if(t!=null) {
                res.redirect('/home');
            }
            else
            {
                res.redirect('/login');
            }
        });


});

module.exports = router;