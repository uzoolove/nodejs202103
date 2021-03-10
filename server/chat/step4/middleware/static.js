const fs = require('fs');
const path = require('path');
const mime = require('mime');
const url = require('url');

// 정적인 컨텐츠를 응답
function staticServer(req, res, next){
  console.log(req.method, req.url, req.httpVersion);
  console.log(req.headers['user-agent']);
  if(req.url == '/'){
    req.url = '/index.html';
  }

  // var url = new URL(req.url);
  var parseUrl = url.parse(req.url);
  var pathname = parseUrl.pathname;

  var filename = path.join(base, pathname);
  var mimeType = mime.getType(filename); // mime@2

  fs.stat(filename, function(err, status){
    if(err){
      next();
    }else if(status.isDirectory()){
      res.writeHead(403, {'Content-Type': 'text/html; charset=utf-8'});
      res.end('<h1>디렉토리 접근 권한 없음.</h1>');
    }else{
      res.writeHead(200, {'Content-Type': mimeType + '; charset=utf-8'});
      fs.createReadStream(filename).pipe(res);
    }
  });
}

var base;
function setBase(dir){
  base = dir;
  return staticServer;
}
module.exports = setBase;