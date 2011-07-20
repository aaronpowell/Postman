test('messages can be delivered with no receiver', function() {
    postman.deliver('test1');
    ok(true);
});

test('receiver can be added without delivery', function() {
    postman.receive('test2');
    ok(true);
});

test('receive before deliver sends message', function() {
    postman.receive('test3', function() { ok(true); });
    postman.deliver('test3');
});

test('receive after deliver sends message', function() {
    postman.deliver('test4');
    postman.receive('test4', function() { ok(true); });
});

test('deliver a message with data and it\'s received', function() {
    postman.receive('test5', function(x) { ok(x === 'win'); });
    postman.deliver('test5', 'win');
});

test('deliver complex message and ye shall receive', function() {
    postman.receive('test6', function(x) { ok(x.foo === 'bar'); });
    postman.deliver('test6', { foo: 'bar' });
});

test('receive can ignore previous messages', function() {
  var notCalled = true;
  
  postman.deliver('test7');
  
  postman.receive('test7', function() {
    notCalled = false;
  }, true);
  
  ok(notCalled);
});

test('can retract a callback and not receive messages', function() {
  var fn = function() {
    ok(false);
  };
  postman.receive('test8', fn);
  
  postman.retract('test8', fn);
  
  postman.deliver('test8');
  
  ok(true);
});

test('messages dropped by date', function() {
  postman.deliver('test9', false);
  
  postman.dropMessages('test9', new Date());
  
  postman.deliver('test9', true);
  
  postman.receive('test9', function(x) {
    ok(x);
  });
});