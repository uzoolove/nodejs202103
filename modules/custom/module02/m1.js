// var tracer = require('tracer').colorConsole({
//   level: 'info',
//   format: '{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})',
//   dateformat: 'HH:MM:ss'
// });

console.log('m1 로딩 시작.');
console.debug(__dirname);
console.debug(__filename);
require('./m2');
console.info('m1 로딩 종료.');