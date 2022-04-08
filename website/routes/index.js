
var user = require('./users');
var admin = require('./admin');

function route(app) {
  app.use('/admin',admin);
  app.use('/',user);
}

module.exports = route;