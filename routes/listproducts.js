var express = require('express');
var models = require('../models');
var slug = require('slug');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   var products=models.Newproducts.findAll().then(function(products){
    res.render('listproducts', { title: 'listproducts',products:products})});
  
});
router.get('/:slug', function (req, res, next) {
    var product_slug=slug(req.params.slug);
    var products=models.Newproducts.findOne({where:{'pslug':product_slug}}).then(function(products){
        res.render('listproductsshow', { title: 'listproducts',products:products.dataValues})});
});
/*router.get('/:id', function (req, res, next) {
    var id=req.params.id;
        var products=models.Newproducts.findOne({id:id}).then(function(products){
    res.render('listproductsshow', { title: 'listproducts',products:products.dataValues})});
    });*/

module.exports = router;

