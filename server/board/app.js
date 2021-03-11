var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/test', function(req, res, next){
  console.log('method', req.method);
  console.log('body', req.body);
  console.log('headers.cookie', req.headers.cookie);
  console.log('cookies', req.cookies);
  console.log('session', req.session);
  next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());  // req.cookies 속성
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));
app.use(session({ // req.session 속성에 세션정보 저장
  cookie: {maxAge: 1000*60*60*2},
  secret: 'sometxt',
  rolling: true,  // 매 응답마다 쿠키 시간 초기화
  resave: false,  // 세션값이 수정되지 않으면 서버에 다시 저장하지 않음
  saveUninitialized: true  // 세션에 아무값도 저장되지 않으면 클라이언트에 쿠키를 전송하지 않음
}));

app.use('/test', function(req, res, next){
  console.log('method', req.method);
  console.log('body', req.body);
  console.log('headers.cookie', req.headers.cookie);
  console.log('cookies', req.cookies);
  console.log('session', req.session);
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, req.url + ' Not Found!!!'));
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

module.exports = app;
