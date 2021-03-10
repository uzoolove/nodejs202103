const net = require('net');
const fs = require('fs');
const path = require('path');
const { RSA_NO_PADDING } = require('constants');

// 1. net.Server 생성
var tcpServer = new net.createServer(function(socket){
  console.log(socket.remoteAddress, '접속함.');
  // 3. error 이벤트를 반드시 처리해야 한다.
  socket.on('error', function(){
    console.log(socket.remoteAddress, '접속 종료.');
  });
  // 4. 클라이언트와 메세지 송수신
  socket.on('data', function(data){
    var req = parseRequest(data.toString());
    console.log(req.method, req.url, req.httpVersion);
    console.log(req.headers['user-agent']);

    if(req.url == '/'){
      req.url = '/index.html';
    }

    var filename = path.join(__dirname, req.url);
    fs.readFile(filename, function(err, data){
      if(err){
        socket.write('HTTP/1.1 404 OK\n');
        socket.write('Content-Type: text/html; charset=utf-8\n');
        socket.write('\n');
        socket.end(`<h1>${req.url} 파일을 찾을 수 없습니다.</h1>`);
      }else{
        socket.write('HTTP/1.1 200 OK\n');
        socket.write('Content-Type: text/html; charset=utf-8\n');
        socket.write('\n');
        socket.end(data);
      }
    });
  });
});

// 브라우저의 요청메세지를 파싱한다.
function parseRequest(data){
  var req = {
    headers: {}
  };

  var arr = data.split('\r\n');
  var startLine = arr.shift().split(' ');
  req.method = startLine[0];
  req.url = startLine[1];
  req.httpVersion = startLine[2];

  for(var i=0; i<arr.length; i++){
    if(arr[i].trim() != ''){
      var header = arr[i].split(':');
      var name = header[0].trim().toLowerCase();
      var value = header[1].trim();
      req.headers[name] = value;
    }else{
      break;
    }
  }
  return req;
}

// 2. 포트 오픈 서버 구동
tcpServer.listen(80, function(){
  console.log('TCP 서버 구동.');
});