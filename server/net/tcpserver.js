const net = require('net');
// 1. net.Server 생성
var tcpServer = new net.createServer(function(socket){
  console.log(socket.remoteAddress, '접속함.');
  // 3. error 이벤트를 반드시 처리해야 한다.
  socket.on('error', function(){
    console.log(socket.remoteAddress, '접속 종료.');
  });
  // 4. 클라이언트와 메세지 송수신
  socket.on('data', function(data){
    console.log('클라이언트로부터 받은 메세지: ' + data);
    socket.write(data);
  });
});

// 2. 포트 오픈 서버 구동
tcpServer.listen(80, function(){
  console.log('TCP 서버 구동.');
});