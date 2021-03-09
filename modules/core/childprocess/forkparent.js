var childProcess = require('child_process');

// fork(modulePath[, args][, options])
// node 전용 프로세스를 실행한다.(stdio: 'inherit')
// spawn()과는 다르게 표준 입출력 장치를 사용할 필요 없이
// 전용 IPC 채널을 만든다.
// fork('forkchild.js') == childProcess.spawn('node.exe', ['forkchild.js'], {stdio: 'inherit'});
