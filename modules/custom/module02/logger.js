var fs = require('fs');
var tracer = require('tracer').colorConsole({
  level: 'debug',
  format: '{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})',
  dateformat: 'HH:MM:ss',
  // root: './logs',
  // maxLogFiles: 90,
  // allLogsFileName: 'myAppName',
  transport: function(data) {
    console.log(data.output);
    fs.appendFile('./logs/logger.log', data.rawoutput + '\n', err => {
      if (err) throw err
    })
  }
});
module.exports = tracer;