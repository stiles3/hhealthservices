const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const withAuth = require('../middleware/auth');

const secret = "whatcaniuse"

router.get('/secret', withAuth, function(req, res) {
  res.send('The password is potato');
});

router.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
})

router.post('/authenticate', function(req, res) {
    const { email, password } = req.body;
    Admin.findOne({ email }, function(err, admin) {
      if (err) {
        console.error(err);
        res.status(500)
          .json({
          error: 'Internal error please try again'
        });
      } else if (!admin) {
        res.status(401)
          .json({
            error: 'Incorrect email or password'
          });
      } else {
        admin.isCorrectPassword(password, function(err, same) {
          if (err) {
            res.status(500)
              .json({
                error: 'Internal error please try again'
            });
          } else if (!same) {
            res.status(401)
              .json({
                error: 'Incorrect email or password'
            });
          } else {
            // Issue token
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: '1h'
            });
            res.cookie('token', token, { httpOnly: true })
              .sendStatus(200);
          }
        });
      }
    });
  });

router.post('/register', function(req, res) {
    const { email, password, name } = req.body;
    const admin = new Admin({ email, password, name });
    admin.save(function(err) {
      if (err) {
        res.status(500)
          .send("Error registering new admin please try again.");
      } else {
        res.status(200).send("Welcome to the club!");
      }
    });
  });

 

module.exports = router
