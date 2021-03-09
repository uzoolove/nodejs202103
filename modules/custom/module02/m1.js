var tracer = require('tracer').colorConsole({
  level: 'info',
  format: '{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})',
  dateformat: 'HH:MM:ss'
});

tracer.log('m1 로딩 시작.');
tracer.debug(__dirname);
tracer.debug(__filename);
require('./m2');
tracer.info('m1 로딩 종료.');