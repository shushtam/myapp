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
    /*var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qwerty',
  database: 'test'
})

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
});
 connection.query('SELECT * from users LIMIT 10', function(err, rows, fields) {
 connection.end();
   if (!err)
      res.render('listUsers', { title: 'listUsers',user:rows});
   else
     console.log('Error while performing Query.');
   });*/
//var sequelize = new Sequelize('test','root', 'qwerty');
 
// check database connection
/*sequelize.sync().then(function() {
  return models.testusers.create({
    name: 'janedoe',
  });
  
    });*/

    var users=models.users.findAll().then(function(users){
    res.render('listUsers', { title: 'listUsers',users:users})});

/*Sequelize.define('users', {

}, {
  timestamps: false
});*/

//models.users.findAll();
/*User
  .find({ where: { username: '23' } })
  .then(function(err, johnDoe) {
    if (!johnDoe) {
      console.log('No user with the username "john-doe" has been found.');
    } else {
      console.log('Hello ' + johnDoe.username + '!');
      console.log('All attributes of john:', johnDoe.get());
    }
  });
console.log(User);*/

});

module.exports = router;
