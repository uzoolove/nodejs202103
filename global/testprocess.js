console.log('1. process 시작.');

process.addListener('exit', function(code){
  console.log('process 종료 직전에 처리할 작업.', code);
  // require('fs').writeFile('error.txt', '에러발생 ' + code + require('os').EOL, {flags: 'a'}, function(){
  //   console.log('비동기 방식으로 에러 로깅 완료.');
  // });
  // ......
  // exit 이벤트 내에서는 비동기 함수 호출이 의미 없으므로 동기함수만 사용해야 한다.
  require('fs').writeFileSync('error.txt', '에러발생 ' + code + require('os').EOL, {flag: 'a'});
});

try{
  a();
}catch(err){
  console.error(err.message);
}

process.exit(1);

setTimeout(function(){
  console.log('1초 후에 호출.');
}, 1000);

console.info('2. process 종료.');