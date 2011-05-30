fs = require 'fs'
path = require 'path'
CoffeeScript = require 'coffee-script'
{spawn, exec} = require 'child_process'
uglify = require "uglify-js"
jsp = uglify.parser
pro = uglify.uglify


# Run a CoffeeScript through our node/coffee interpreter.
run = (args) ->  
	proc =         spawn 'coffee', args  
	proc.stderr.on 'data', (buffer) -> console.log buffer.toString()  
	proc.on        'exit', (status) -> process.exit(1) if status != 0
	
task 'build', 'builds the postman', ->
	files = fs.readdirSync 'src'
	files = ('src/' + file for file in files when file.match(/\.coffee$/))  
	run ['-c', '-o', 'lib'].concat(files)
	
task 'minify', 'minifies postman to a release build', ->
	files = fs.readdirSync 'lib'
	files = ('lib/' + file for file in files where file.match(/\.js$/))
	
	