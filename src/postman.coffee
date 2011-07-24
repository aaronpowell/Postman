class LinkedList
  constructor: () ->
    @first = null
    @last = null
    @length = 0
    
  append: (data) ->
    return if !data
    
    node = 
      data: data
      next: null
      prev: null
    
    if !@first
      @first = node
      @last = node
    else
      @last.next = node
      node.prev = last
      @last = node
    
    @length++

  remove: (node) ->
    return if !node
    
    if !node.prev
      @first = node.next
      if @first
        @first.prev = null
    else
      node.prev.next = node.next
    @length--
      
postie      
class Postman
  isArray = (obj) ->
    obj.constructor == Array
  isFunction = (obj) ->
    obj.constructor == Function
  isDate = (obj) ->
      obj.constructor == Date
  
  createCache = (name) ->
      cache[name] =
        subs: new LinkedList
        history: new LinkedList

        constructor: () ->
    cache = {}
  
  deliver: (name, args) ->
    createCache name if ! cache[name]
    args = [] if !args
    args = [args] if !isArray args
    args = 
      created: new Date
      lastPublished: new Date
      args: args
    cache[name].history.append args
    fn = cache[name].subs.first
  
    while fn
      fn.data.apply this, args.args
      fn = fn.next
  
    postie
  
  receive: (name, fn, ignoreHistory) ->
    createCache name if ! cache[name]
    cache[name].subs.append fn
    if !ignoreHistory
      arg = cache[name].history.first
      while arg
        fn.apply this, arg.data.args
        arg.data.lastPublished = new Date
        arg = arg.next
      postie
  
  retract: (name, fn) ->
    createCache name if !cache[name]
    if !fn
      cache[name].subs = new LinkedList
    else
      subs = cache[name].subs
      sub = subs.first
      while sub
        if sub.data == fn
          subs.remove sub
        sub = sub.next
    postie
  
  dropMessages: (name, criteria) ->
    createCache name if ! cache[name]
    if criteria
      cache[name].history = dropByFunction criteria, cache[name].history if isFunction criteria
      cache[name].history = dropByDate criteria, cache[name].history if isDate criteria
    else
      cache[name].history = new LinkedList
    
    postie.deliver 'dropMessage.' + name
    
  dropByFunction = (fn, msgs) ->
    msg = msgs.first
    while msg
      if fn.apply msg.data
        msgs.remove msg
      msg = msg.next
    msgs
    
  dropByDate = (date, msgs) ->
    msg = msgs.first
    while msg
      if msg.data.created < date
        msgs.remove msg
      msg = msg.next
    msgs
    
postie = new Postman
  
this.LinkedList = LinkedList
this.postman = postie