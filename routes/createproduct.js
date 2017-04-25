var express = require('express');
var models = require('../models');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

     res.render('createproduct', { title: 'createproduct'});
});
router.post('/', function(req, res, next) {

    models.Newproducts.create(
        { name: req.body.name,
            user_id: req.body.user_id,
            quality: req.body.quality,
            title: req.body.title}).then(function (product) {
                product.update({'pslug':"product-"+product.id});
    });
   // var pusers = models.users.findOne({where:{}});
   /* var user=models.Newproducts.findOne({
        where:{name: req.body.name, user_id: req.body.user_id, quality: req.body.quality, title: req.body.title}
    }).then(function (user) {
        user.update({'pslug':"product-"+user.id});

    });*/
    res.redirect('/listproducts');
});

module.exports = router;
