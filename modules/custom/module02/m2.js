// var tracer = require('tracer').colorConsole({
//   level: 'info',
//   format: '{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})',
//   dateformat: 'HH:MM:ss'
// });
console.log('m2 로딩 시작.');
console.debug(__dirname);
console.debug(__filename);
require('./m3');
console.info('m2 로딩 종료.');