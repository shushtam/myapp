var express = require('express');
var models = require('../models');
var Sequelize = require('sequelize');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    /* var fs = require('fs');
     var obj = JSON.parse(fs.readFileSync(__dirname + "/../public/javascripts/" + "testusers.json", 'utf8'));
     console.log("xx");
     res.render('listUsers', { title: 'listUsers',user:obj});*/
    var users = models.users.findAll().then(function (users) {
        res.render('listUsers', {title: 'listUsers', users: users})
    });


});
router.post('/edit/:id', function (req, res) {
    var users = models.users.findOne({
        where: {id: req.params.id}
    }).then(function (users) {
        
        users.update({name: req.body.name, email: req.body.email})
                .then(function (users) {
                    var pusers=models.users.findOne({
                        where: {id: users.dataValues.id}, include: [
                                {model: models.products}
                            ]
                    }).then(function (pusers) {
                        res.render('listUsersShow', {title: 'listUsers', users: pusers.dataValues});
                    });
                });
    });

});
router.get('/edit/:id', function (req, res, next) {
    var id = req.params.id;
    var users = models.users.findOne({
        where: {id: req.params.id}
    }).then(function (users) {
        res.render('listUsersEdit', {title: 'listUsersEdit', users: users.dataValues})
    });

});
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    var users = models.users.findOne({
        where: {id: req.params.id},
        include: [
            {model: models.products}
        ]
    }).then(function (users) {
        res.render('listUsersShow', {title: 'listUsers', users: users.dataValues})
    });
});



module.exports = router;
