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