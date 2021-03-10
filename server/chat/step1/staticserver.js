const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const url = require('url');

// 로그파일
var logfile = fs.createWriteStream('log.txt', {flags: 'a'});

// 정적인 컨텐츠를 응답
function staticServer(req, res){
  console.log(req.method, req.url, req.httpVersion);
  console.log(req.headers['user-agent']);
  if(req.url == '/'){
    req.url = '/index.html';
  }

  // var url = new URL(req.url);
  var parseUrl = url.parse(req.url);
  var pathname = parseUrl.pathname;

  var filename = path.join(__dirname, pathname);
  var mimeType = mime.getType(filename); // mime@2

  fs.stat(filename, function(err, status){
    if(err){
      res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
      res.end(`<h1>${req.url} 파일을 찾을 수 없습니다.</h1>`);
    }else if(status.isDirectory()){
      res.writeHead(403, {'Content-Type': 'text/html; charset=utf-8'});
      res.end('<h1>디렉토리 접근 권한 없음.</h1>');
    }else{
      res.writeHead(200, {'Content-Type': mimeType + '; charset=utf-8'});
      fs.createReadStream(filename).pipe(res);
    }

    // 로깅 메세지 출력
    logfile.write(`[${Date()}] ${res.statusCode} ${req.url}`);
    logfile.write(require('os').EOL);
  });
}

// 1. http.Server 생성
var tcpServer = new http.createServer(staticServer);

// 2. 포트 오픈 서버 구동
tcpServer.listen(80, function(){
  console.log('TCP 서버 구동.');
});