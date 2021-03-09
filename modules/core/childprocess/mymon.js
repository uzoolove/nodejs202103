var { fork } = require('child_process');
var path = require('path');
var fs = require('fs');

// node mymon.js ../../../hello/helloserver.js 8080
// => node helloserver.js 8080

var args = process.argv.slice(3);
// 상대경로가 포함된 경로를 절대경로로 변환
var file = path.resolve(process.argv[2]);
var filename = path.basename(file);
var child;

function runChild(){
  child = fork(file, args);
  console.log('running node.exe', filename, args);
  child.on('close', function(){
    console.log('stop', filename);
  });
}

runChild();

function restart(){
  if(child) child.kill();
  setTimeout(runChild, 1000);
}

fs.watchFile(file, restart);

// 'rs' 명령어를 입력하고 엔터를 치면 수동으로 재시작한다.
// 표준입력 장치로부터 'data' 이벤트 등록
// 전달받은 메세지가 'rs'인지 확인한 후 restart() 호출.
process.stdin.on('data', function(data){
  if(data.toString().trim()=='rs') restart();
});