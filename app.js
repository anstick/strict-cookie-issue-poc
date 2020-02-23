const express = require('express');
const path = require('path');
const app = express();
const uuid = require('uuid/v4');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: false }));

app.get('/redirect', function(req, res, next) {
  res.redirect('https://oauthserver.strictcookies.poc.local:3000/');
});

app.get('/', function(req, res, next) {
  const csrfToken = uuid();
  res
    .cookie('csrf_token', csrfToken, {
      domain: 'oauthserver.strictcookies.poc.local',
      httpOnly: false,
      secure: true,
      sameSite: 'Strict'
    })
    .render('index', { title: 'Login', csrfToken: csrfToken });
});

module.exports = app;
