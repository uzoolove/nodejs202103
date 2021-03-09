const { exec, execFile } = require('child_process');

// spawn()으로 쉘을 생성한 후 command를 전송한다.
// 출력이 완료되면 callback 호출.
// exec(command[, options][, callback])
exec('dir', function(err, stdoutMsg, stderrMsg){
  if(err) console.error(err);
  console.log('stdout', stdoutMsg);
  console.log('stderr', stderrMsg);
});

// 지정한 file을 실행한다.
// execFile(file[, args][, options][, callback])
execFile('calc.exe', function(err, stdoutMsg, stderrMsg){
  if(err) console.error(err);
  console.log('stdout', stdoutMsg);
  console.log('stderr', stderrMsg);
});