var express = require('express');
var models = require('../models');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   var products=models.products.findAll().then(function(products){
    res.render('listProducts', { title: 'listProducts',products:products})});
  
});
router.get('/:id', function (req, res, next) {
    var id=req.params.id;
        var products=models.products.findOne({id}).then(function(products){
    res.render('listProductsShow', { title: 'listProducts',products:products.dataValues})});
    });

module.exports = router;

