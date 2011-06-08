cache = {}

isArray = (obj) ->
	obj.constructor == Array
isFunction = (obj) ->
	obj.constructor == Function
isDate = (obj) ->
    obj.constructor == Date

createCache = (name) ->
    cache[name] =
      subs: []
      history: []

deliver = (name, args) ->
  createCache name if ! cache[name]
  args = [] if !args
  args = [args] if !isArray args
  args = 
    created: new Date()
    lastPublished: new Date()
    args: args
  cache[name].history.push args
  fn.apply this, args.args for fn in cache[name].subs
  postman

receive = (name, fn) ->
  createCache name if ! cache[name]
  cache[name].subs.push fn
  fn.apply this, arg.args for arg in cache[name].history
  postman

dropMessages = (name, criteria) ->
  createCache name if ! cache[name]
  if criteria
    cache[name].history = dropByFunction criteria, cache[name].history if isFunction criteria
    cache[name].history = dropByDate criteria, cache[name].history if isDate criteria
  else
    cache[name].history = []
	
  postname.deliver 'dropMessage.' + name
  
dropByFunction = (fn, msgs) ->
  msgs.reduce fn
  
dropByDate = (date, msgs) ->
    msgs.reduce (x) ->
        x.lastPublished < date
  
this.postman =
  deliver: deliver
  receive: receive
  dropMessages: dropMessages
