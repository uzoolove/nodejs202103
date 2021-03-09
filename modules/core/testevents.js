const EventEmitter = require('events');

class MyEmitter extends EventEmitter{};

var emitter = new MyEmitter();

emitter.on('newListener', function(eventName, listener){
  console.log('listener 추가됨.', eventName);
});

emitter.addListener('event1', print);
emitter.on('event1', print);
emitter.once('event1', print);

emitter.emit('event1', 'msg-1');
emitter.emit('event1', 'msg-2');

function print(msg){
  console.log(msg);
}