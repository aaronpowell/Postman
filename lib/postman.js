(function() {
  var LinkedList, Postman, postie;
  LinkedList = (function() {
    function LinkedList() {
      this.first = null;
      this.last = null;
      this.length = 0;
    }
    LinkedList.prototype.append = function(data) {
      var node;
      if (!data) {
        return;
      }
      node = {
        data: data,
        next: null,
        prev: null
      };
      if (!this.first) {
        this.first = node;
        this.last = node;
      } else {
        this.last.next = node;
        node.prev = last;
        this.last = node;
      }
      return this.length++;
    };
    LinkedList.prototype.remove = function(node) {
      if (!node) {
        return;
      }
      if (!node.prev) {
        this.first = node.next;
        if (this.first) {
          this.first.prev = null;
        }
      } else {
        node.prev.next = node.next;
      }
      return this.length--;
    };
    return LinkedList;
  })();
  postie;
  Postman = (function() {
    var cache, createCache, dropByDate, dropByFunction, isArray, isDate, isFunction;
    function Postman() {}
    isArray = function(obj) {
      return obj.constructor === Array;
    };
    isFunction = function(obj) {
      return obj.constructor === Function;
    };
    isDate = function(obj) {
      return obj.constructor === Date;
    };
    createCache = function(name) {
      return cache[name] = {
        subs: new LinkedList,
        history: new LinkedList,
        constructor: function() {}
      };
    };
    cache = {};
    Postman.prototype.deliver = function(name, args) {
      var fn;
      if (!cache[name]) {
        createCache(name);
      }
      if (!args) {
        args = [];
      }
      if (!isArray(args)) {
        args = [args];
      }
      args = {
        created: new Date,
        lastPublished: new Date,
        args: args
      };
      cache[name].history.append(args);
      fn = cache[name].subs.first;
      while (fn) {
        fn.data.apply(this, args.args);
        fn = fn.next;
      }
      return postie;
    };
    Postman.prototype.receive = function(name, fn, ignoreHistory) {
      var arg;
      if (!cache[name]) {
        createCache(name);
      }
      cache[name].subs.append(fn);
      if (!ignoreHistory) {
        arg = cache[name].history.first;
        while (arg) {
          fn.apply(this, arg.data.args);
          arg.data.lastPublished = new Date;
          arg = arg.next;
        }
        return postie;
      }
    };
    Postman.prototype.retract = function(name, fn) {
      var sub, subs;
      if (!cache[name]) {
        createCache(name);
      }
      if (!fn) {
        cache[name].subs = new LinkedList;
      } else {
        subs = cache[name].subs;
        sub = subs.first;
        while (sub) {
          if (sub.data === fn) {
            subs.remove(sub);
          }
          sub = sub.next;
        }
      }
      return postie;
    };
    Postman.prototype.dropMessages = function(name, criteria) {
      if (!cache[name]) {
        createCache(name);
      }
      if (criteria) {
        if (isFunction(criteria)) {
          cache[name].history = dropByFunction(criteria, cache[name].history);
        }
        if (isDate(criteria)) {
          cache[name].history = dropByDate(criteria, cache[name].history);
        }
      } else {
        cache[name].history = new LinkedList;
      }
      return postie.deliver('dropMessage.' + name);
    };
    dropByFunction = function(fn, msgs) {
      var msg;
      msg = msgs.first;
      while (msg) {
        if (fn.apply(msg.data)) {
          msgs.remove(msg);
        }
        msg = msg.next;
      }
      return msgs;
    };
    dropByDate = function(date, msgs) {
      var msg;
      msg = msgs.first;
      while (msg) {
        if (msg.data.created < date) {
          msgs.remove(msg);
        }
        msg = msg.next;
      }
      return msgs;
    };
    return Postman;
  })();
  postie = new Postman;
  this.LinkedList = LinkedList;
  this.postman = postie;
}).call(this);
