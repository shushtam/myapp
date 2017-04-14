var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/listUsers/:id', function(req, res, next) {

        console.log(req.params);
    //res.render('hello', { title: 'Express' });
  res.send("xx");
});

module.exports = router;


