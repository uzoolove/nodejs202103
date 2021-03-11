/**
 * 웹어플리케이션 개발시 일반적으로 처리해야할 작업
 * 1. 로깅(logger)
 * 2. url 텍스트 인코딩
 * 3. POST 방식의 요청 바디 파싱
 * 4. JSON 방식의 데이터 파싱
 * 5. 쿠키 파싱
 * 6. 정적인 자원 응답(static)
 * 7. 세션 관리
 * 8. 동적인 자원 응답
 * 9. 파일 업로드
 * 10. 보안(인증, 권한)
 * 11. 에러 처리
 * ......
 * 
 * 각각의 기능을 독립적인 모듈(함수)로 작성(미들웨어)
 * connect 확장모듈 사용
 *  - 미들웨어를 관리하는 컨테이너
 *  - connect@2: 미들웨어 관리 + 미들웨어 직접 제공
 *  - connect@3: 미들웨어 관리
 */

 var path = require('path');
 var fs = require('fs');

var connect = require('connect');
var logger = require('morgan');
var static = require('serve-static');
var session = require('express-session');

const indexRouter = require('./routes/index');

var app = connect();

app.use(logger('dev'));
app.use(static(path.join(__dirname, 'public')));

app.use(session({ // req.session 속성에 세션정보 저장
  cookie: {maxAge: 1000*30},
  secret: 'sometxt',
  rolling: true,  // 매 응답마다 쿠키 시간 초기화
  resave: false,  // 세션값이 수정되지 않으면 서버에 다시 저장하지 않음
  saveUninitialized: false  // 세션에 아무값도 저장되지 않으면 클라이언트에 쿠키를 전송하지 않음
}));
app.use(indexRouter);

// 404 에러 처리 미들웨어
app.use(function(req, res, next){
  // connect 미들웨어
  // 1. (err), req, res, next를 인자값으로 받는다.
  // 2. res 응답을 끝내거나 next를 호출한다.
  var error = new Error(req.url + ' 파일을 찾을 수 없습니다.');
  error.status = 404;
  next(error);
});

// 에러 처리 전용 미들웨어
app.use(function(error, req, res, next){
  var filename = path.join(__dirname, 'views', 'error.html');
  fs.readFile(filename, function(err, data){
    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'});
    data = data.toString().replace('<%=message%>', error.message)
                          .replace('<%=error.status%>', error.status)
                          .replace('<%=error.stack%>', error.stack);
    res.end(data);
  });
});

module.exports = app;