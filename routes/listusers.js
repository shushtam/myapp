var express = require('express');
var models = require('../models');
var Sequelize = require('sequelize');
var validator = require('express-validator');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    /* var fs = require('fs');
     var obj = JSON.parse(fs.readFileSync(__dirname + "/../public/javascripts/" + "testusers.json", 'utf8'));
     console.log("xx");
     res.render('listUsers', { title: 'listUsers',user:obj});*/
    var users = models.users.findAll().then(function (users) {
        res.render('listusers', {title: 'listusers', users: users});
    });


});
router.post('/edit/:id', function (req, res) {
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('name', 'Name must contain only letters').matches(/[a-zA-Z]/);
    req.checkBody('name', 'Name is too short').len(3);
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email does not appear to be valid').isEmail();
    var errors = req.validationErrors();
    if (errors) {
        var users = models.users.findOne({
            where: {id: req.params.id}
        }).then(function (users) {
            res.render('listusersedit', {
                title: 'listusers',
                users: req.body,
                flash: {type: 'alert-danger', messages: errors}
            });
        });

    }
    else {

        var users = models.users.findOne({
            where: {id: req.params.id}
        }).then(function (users) {

            users.update({name: req.body.name, email: req.body.email})
                .then(function (users) {
                    var pusers = models.users.findOne({
                        where: {id: users.dataValues.id}, include: [
                            {model: models.Newproducts}
                        ]
                    }).then(function (pusers) {
                        res.render('listusersshow', {
                            title: 'listusers',
                            users: pusers.dataValues,
                            flash: {type: 'alert-success', messages: [{msg: 'No errors!'}]}
                        });

                    });
                });
        });

    }

});
router.get('/edit/:id', function (req, res, next) {
    var id = req.params.id;
    var users = models.users.findOne({
        where: {id: req.params.id}
    }).then(function (users) {
        res.render('listusersedit', {title: 'listusersedit', users: users.dataValues});
    });

});
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    var users = models.users.findOne({
        where: {id: req.params.id},
        include: [
            {model: models.Newproducts}
        ]
    }).then(function (users) {
        res.render('listusersshow', {title: 'listusers', users: users.dataValues});
    });
});


module.exports = router;
