cache = {}

isArray = (obj) ->
	obj.constructor == Array

createCache = (name) ->
    cache[name] =
      subs: []
      history: []

deliver = (name, args) ->
  createCache name if ! cache[name]
  args = [] if !args
  args = [args] if !isArray args
  cache[name].history.push args
  fn.apply this, args for fn in cache[name].subs
  postman

receive = (name, fn) ->
  createCache name if ! cache[name]
  cache[name].subs.push fn
  fn.apply this, arg for arg in cache[name].history
  postman

dropMessages = (name) ->
  createCache name if ! cache[name]
  cache[name].history = []
  postname.deliver 'dropMessage.' + name

this.postman =
  deliver: deliver
  receive: receive
  dropMessages: dropMessages
