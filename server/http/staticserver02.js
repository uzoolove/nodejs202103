// var mime = {
//   'html': 'text/html',
//   'svg': 'image/svg+xml',
//   'jpg': 'image/jpeg',
//   'png': 'image/png',
//   'gif': 'image/gif',
//   'css': 'text/css',
//   'js': 'application/javascript'
//   // ......
// };

// function getMimeType(url){
//   var extname = path.extname(url).substring(1);
//   return mime[extname];
// }

const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

// 1. http.Server 생성
var tcpServer = new http.createServer(function(req, res){
  console.log(req.method, req.url, req.httpVersion);
  console.log(req.headers['user-agent']);
  if(req.url == '/'){
    req.url = '/index.html';
  }
  var filename = path.join(__dirname, req.url);

  // var mimeType = getMimeType(filename);  
  // var mimeType = mime.lookup(filename); // mime@1
  var mimeType = mime.getType(filename); // mime@2

  fs.readFile(filename, function(err, data){
    if(err){
      res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
      res.end(`<h1>${req.url} 파일을 찾을 수 없습니다.</h1>`);
    }else{
      res.writeHead(200, {'Content-Type': mimeType + '; charset=utf-8'});
      res.end(data);
    }
  });
});

// 2. 포트 오픈 서버 구동
tcpServer.listen(80, function(){
  console.log('TCP 서버 구동.');
});