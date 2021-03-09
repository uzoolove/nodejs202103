var fs = require('fs');
var os = require('os');

console.log('범용성이 필요한 확장모듈이 주로 사용하는 패턴(connect의 미들웨어)');
function logger(options){
  if(options && options.target == 'file'){
    var logfile = fs.createWriteStream(options.filename || 'logger.txt', {flags: 'a'});
  }
  return {
    log: function(msg){
      if(logfile){
        logfile.write('<log> ' + msg + os.EOL);
      }else{
        console.log('<log> ' + msg);
      }
    },
    debug: function(msg){
      if(logfile){
        logfile.write('<debug> ' + msg + os.EOL);
      }else{
        console.debug('<debug> ' + msg);
      }
    },
    // ......
  };
}

module.exports = logger;