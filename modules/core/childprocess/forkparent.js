var childProcess = require('child_process');

// fork(modulePath[, args][, options])
// node 전용 프로세스를 실행한다.(stdio: 'inherit')
// spawn()과는 다르게 표준 입출력 장치를 사용할 필요 없이
// 전용 IPC 채널을 만든다.
// fork('forkchild.js') == childProcess.spawn('node.exe', ['forkchild.js'], {stdio: 'inherit'});
var child = childProcess.fork('forkchild.js');

// 4. Parent <- Child
child.on('message', function(data){
  console.log('from child: ' + data);
});
// 1. Parent -> Child
child.send('hello');

// 자식 프로세스가 비정상 종료될 경우 '에러 발생' 출력
child.on('exit', function(code){
  if(code){
    console.error('에러 발생.', code);
  }else{
    console.log('정상 종료.');
  }
});