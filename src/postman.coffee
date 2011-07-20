cache = {}
postie
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
  postie

receive = (name, fn, ignoreHistory) ->
  createCache name if ! cache[name]
  cache[name].subs.push fn
  if !ignoreHistory
    for arg in cache[name].history
      fn.apply this, arg.args
      arg.lastPublished = new Date()
  postie

retract = (name, fn) ->
  createCache name if !cache[name]
  if !fn
    cache[name].subs = []
  else
    subs = cache[name].subs
    index = subs.indexOf fn
    if index > -1
      subs.splice(0, index).concat subs.splice index, subs.length
  postie
  
dropMessages = (name, criteria) ->
  createCache name if ! cache[name]
  if criteria
    cache[name].history = dropByFunction criteria, cache[name].history if isFunction criteria
    cache[name].history = dropByDate criteria, cache[name].history if isDate criteria
  else
    cache[name].history = []
	
  postie.deliver 'dropMessage.' + name
  
dropByFunction = (fn, msgs) ->
  msgs.filter fn
  
dropByDate = (date, msgs) ->
    msgs.filter (x) ->
        x.created < date
  
postie =
  deliver: deliver
  receive: receive
  dropMessages: dropMessages
  retract: retract
  
this.postman = postie