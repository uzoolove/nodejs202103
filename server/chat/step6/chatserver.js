function server(io){
  io.on('connection', function(socket){
    socket.on('disconnect', function(){
      io.emit('toclient', `시스템: ${socket.nickname}님이 퇴장했습니다.`);
    });
    socket.on('login', function(nickname){
      socket.nickname = nickname || 'Guest';
      io.emit('toclient', `시스템: ${socket.nickname}님이 입장했습니다.`);
    });
    socket.on('chat', function(msg){
      io.emit('toclient', `시스템: ${socket.nickname}: ${msg}`);
    });
  });
};

module.exports = server;