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

var connect = require('connect');
var path = require('path');
var fs = require('fs');

const static = require('./middleware/static');
const logger = require('./middleware/logger');
const indexRouter = require('./routes/index');

// function app(req, res){
//   // 콜백 패턴: 비동기 함수의 실행 순서를 지정하기 위해서
//   static(req, res, function(){
//     logger(req, res);
//   });
// }

var app = connect();
app.use(static(path.join(__dirname, 'public')));
app.use(logger({target: 'file', filename: 'chat.log'}));

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