var http = require('http');
var app = require('../app');

// 1. http.Server 생성
var server = new http.createServer(app);

// 2. 포트 오픈 서버 구동
server.listen(80, function(){
  console.log('HTTP 서버 구동.');
});

// socket.io 서버 구동
var io = require('socket.io')(server);
require('../chatserver')(io);