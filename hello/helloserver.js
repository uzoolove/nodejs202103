const http = require('http');
const fs = require('fs');
const path = require('path');
const hello = require('./hellonode');

var server = http.createServer(function(req, res){
  // res.writeHead(200);
  // res.write('<h1>Hello HTTP Server!</h1>');
  // res.end();


  var filename = req.url.substring(1);
  filename = path.join(__dirname, filename);

  // 동기 방식의 함수 호출
  // try{
  //   var data = fs.readFileSync(filename);
  //   res.writeHead(200);
  //   res.end(data);
  // }catch(err){
  //   res.writeHead(404);
  //   res.end('<h1>' + req.url + ' file not found!</h1>');
  // }

  // 비동기 방식의 함수 호출
  fs.readFile(filename, function(err, data){
    if(err){
      res.writeHead(404);
      res.end('<h1>' + hello.hi(req.url) + ' file not found!!!</h1>');
    }else{
      res.writeHead(200);
      res.end(data);
    }
  });

});
var port = 1234;
server.listen(port, function(){
  // http://localhost:1234/hello.html
  console.log('Start HTTP Server.', port);
});