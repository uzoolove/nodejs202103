// 표준 입력 장치로부터 데이터가 입력되면
process.stdin.on('data', function(data){
  // 표준 출력 장치로 출력한다.
  process.stdout.write(data.toString() + require('os').EOL);
  console.log(data.toString());
});

process.stdin.emit('data', Buffer.from('수동으로 이벤트 발생.'));