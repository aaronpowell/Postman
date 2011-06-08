fs = require 'fs'
path = require 'path'
CoffeeScript = require 'coffee-script'
uglify = require "uglify-js"
jsp = uglify.parser
pro = uglify.uglify


clean = ->
	files = fs.readdirSync 'lib'
	(fs.unlinkSync 'lib/' + file) for file in files
	
makeUgly = (err, str, file) ->
	ast = jsp.parse str
	ast = pro.ast_mangle ast
	ast = pro.ast_squeeze ast
	code = pro.gen_code ast
	fs.writeFile (file.replace /\.js/, '.min.js'), code

task 'cleanup', 'cleans up the libs before a release', ->
	clean()
	
task 'build', 'builds the postman', ->
    console.log 'building postman from coffeescript'
    code = fs.readFileSync 'src/postman.coffee', 'utf8'
    fs.writeFile 'lib/postman.js', CoffeeScript.compile code
	
task 'minify', 'minifies postman to a release build', ->
	console.log 'minifying postman'
	files = fs.readdirSync 'lib'
	files = ('lib/' + file for file in files when file.match(/\.js$/))
	(fs.readFile file, 'utf8', (err, data) -> makeUgly err, data, file) for file in files
	
task 'release', 'creates a release of postman', ->
    invoke 'cleanup'
    invoke 'build'
    invoke 'minify'
