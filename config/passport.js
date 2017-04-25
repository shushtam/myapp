var LocalStrategy = require('passport-local').Strategy;
var models = require('../models');
var User = require('../models/users');
var bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;
module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        models.users.findOne({where: {'id': id}}).then(function (user) {
            done(null, user);
        });
    });
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            process.nextTick(function () {
                models.users.create(
                    {
                        name: email,
                        email: email,
                        password: bcrypt.hashSync(password)
                    }).then(function (user) {
                    return done(null, user);
                });
            });


        }));
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            models.users.findOne({where: {'email': email}}).then(function (user) {
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }

                if (bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                }
                else {
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                }

            });

        }));


};
