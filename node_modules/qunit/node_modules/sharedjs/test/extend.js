QUnit.module("extend");

test("plain objects", function() {
    deepEqual(  extend({test1: 1}, {test2: 2}), {test1: 1, test2: 2}, "extend 2 simple objects" );
    deepEqual(  extend({test1: 1}, {test2: 2}, {test3: 3}), {test1: 1, test2: 2, test3: 3}, "extend 3 simple objects" );
    deepEqual(  extend({test1: 1}, true), {test1: 1}, "2 arg is not an object" );
});

test("instance into plain object", function() {
    var obj = function() {};
    obj.prototype = {test2: 2};
    obj = new obj;
    deepEqual(  extend( {test1: 1}, obj ), {test1: 1, test2: 2}, "extend object with its prototype" );
});

test("function object and plain object", function() {
    var obj = function() {};
    obj.test2 = 2;
    deepEqual(  extend( {test1: 1}, obj ), {test1: 1, test2: 2}, "extend function and object" );
});

test("deep", function() {
    deepEqual(  extend( true, {test1: {test1: 1}}, {test1: {test2: 2} } ), { test1: {test1: 1, test2: 2} }, "deep extend" );    
    deepEqual(  extend( true, {test: {test: 'test'}}, {test: {test: 'test'} } ), {test: {test: 'test'} }, "deep extend, check endless lop" );
});

