const path = require('path');
var filename = path.basename(__filename);
console.log(filename, '실행');

// 2. Parent -> Child
process.on('message', function(data){
  // 3. Child -> Parent
  process.send(data);
});

setTimeout(function(){
  // process.exit(0);  // 정상 종료
  // a();
}, 1000);