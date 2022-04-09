var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var router =require('./routes');

const Handlebars = require("handlebars");
const { create } = require("express-handlebars");

var app = express();
var PORT = process.env.PORT || 3000;

var handlebarsHelper = require('./util/buil_helper_handlebar');

// view engine setup
const hbs = create({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: `hbs`,
    helpers: {
      check: handlebarsHelper.check,
      tam:handlebarsHelper.tam
    }
    // defaultLayout: 'main',
    // partialsDir: `${__dirname}/views/partials`
});
app.engine('hbs', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Handlebars.registerHelper( "when",function(operand_1, operator, operand_2, options) {
//   var operators = {
//    'eq': function(l,r) { return l == r; },
//    'noteq': function(l,r) { return l != r; },
//    'gt': function(l,r) { return Number(l) > Number(r); },
//    'or': function(l,r) { return l || r; },
//    'and': function(l,r) { return l && r; },
//    '%': function(l,r) { return (l % r) === 0; }
//   }
//   , result = operators[operator](operand_1,operand_2);

//   if (result) return options.fn(this);
//   else  return options.inverse(this);
// });


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// static file
app.use("/admin",express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


//render
router(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
})

