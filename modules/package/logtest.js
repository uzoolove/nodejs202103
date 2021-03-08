console.log('console.log');
console.info('console.info');
console.warn('console.warn');
console.error('console.error');
console.debug('console.debug');

var clog = require('clog');
clog.configure({'log level': 2});
clog.log('clog.log');
clog.info('clog.info');
clog.warn('clog.warn');
clog.error('clog.error');
clog.debug('clog.debug');

var tracer = require('tracer').colorConsole();
tracer.log('tracer.log');
tracer.info('tracer.info');
tracer.warn('tracer.warn');
tracer.error('tracer.error');
tracer.debug('tracer.debug');