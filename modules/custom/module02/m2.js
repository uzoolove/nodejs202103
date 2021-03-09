var tracer = require('tracer').colorConsole({
  level: 'info',
  format: '{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})',
  dateformat: 'HH:MM:ss'
});
tracer.log('m2 로딩 시작.');
tracer.debug(__dirname);
tracer.debug(__filename);
require('./m3');
tracer.info('m2 로딩 종료.');