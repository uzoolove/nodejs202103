const http = require('http');
const fs = require('fs');
const path = require('path');
const hello = require('./hellonode');

// request (event) listener
function myListener(req, res){
  var filename = req.url.substring(1);
  filename = path.join(__dirname, filename);

  // 스트림 방식
  var filestream = fs.createReadStream(filename, {highWaterMark: 1024*64});
  filestream.on('open', function(){
    res.writeHead(200);
  });
  filestream.on('error', function(){
    res.writeHead(404).end('<h1>' + hello.hi(req.url) + ' file not found!!!!!</h1>');
  });
  filestream.on('close', function(){
    res.end();
  });
  filestream.pipe(res);
  // filestream.on('data', function(data){
  //   console.log(data.length);
  //   res.write(data);
  // });
}

// var server = http.createServer(myListener);
var server = new http.Server();
server.on('request', myListener);

// var port = 1234;
var port = process.argv[2] || 8000;
// server.listen(port, function(){
//   console.log('Start HTTP Server.', port);
// });
server.on('listening', function(){
  console.log('Start HTTP Server.', port);
});
server.on('error', function(err){
  console.log('서버 구동 실패.', err.message);
  server.listen(++port);
});
server.listen(port);