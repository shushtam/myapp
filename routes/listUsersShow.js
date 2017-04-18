var express = require('express');
var models = require('../models');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(id);
        /*var users=models.users.findOne({where:{id:req.params.id}}).then(function(users){
    res.render('listUsersShow', { title: 'listUsers',users:users.dataValues})});*/
});

module.exports = router;


