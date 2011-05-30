(function() {
  var cache, createCache, deliver, dropMessages, isArray, receive;
  cache = {};
  isArray = function(obj) {
    return obj.constructor === Array;
  };
  createCache = function(name) {
    return cache[name] = {
      subs: [],
      history: []
    };
  };
  deliver = function(name, args) {
    var fn, _i, _len, _ref;
    if (!cache[name]) {
      createCache(name);
    }
    if (!args) {
      args = [];
    }
    if (!isArray(args)) {
      args = [args];
    }
    cache[name].history.push(args);
    _ref = cache[name].subs;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      fn = _ref[_i];
      fn.apply(this, args);
    }
    return postman;
  };
  receive = function(name, fn) {
    var arg, _i, _len, _ref;
    if (!cache[name]) {
      createCache(name);
    }
    cache[name].subs.push(fn);
    _ref = cache[name].history;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      arg = _ref[_i];
      fn.apply(this, arg);
    }
    return postman;
  };
  dropMessages = function(name) {
    if (!cache[name]) {
      createCache(name);
    }
    cache[name].history = [];
    return postname.deliver('dropMessage.' + name);
  };
  this.postman = {
    deliver: deliver,
    receive: receive,
    dropMessages: dropMessages
  };
}).call(this);
