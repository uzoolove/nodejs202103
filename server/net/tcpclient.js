const net = require('net');
var target = {
  // host: 'localhost',
  // host: '3.35.228.121',
  host: 'google.com',
  port: 80
};

// 1. 소켓 생성
var socket = new net.Socket();
// 2. 서버 접속
socket.connect(target.port, target.host, function(){
  console.log(`서버 접속. ${target.host}:${target.port}`);
  // 3. 서버와 메세지 송수신
  // socket.write('hello');
  socket.write('GET / HTTP/1.1\n\n');
  socket.on('data', function(data){
    console.log('서버로부터 수신한 메세지: ' + data);
  });
});

// 표준 입력장치로부터 메세지를 읽어서 서버에 전송
process.stdin.on('data', function(data){
  socket.write(data);
});

