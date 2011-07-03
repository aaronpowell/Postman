fs = require 'fs'
path = require 'path'
CoffeeScript = require 'coffee-script'
uglify = require "uglify-js"
jsp = uglify.parser
pro = uglify.uglify
file = 'postman'
source = 'src'
output = 'lib'

clean = ->
	files = fs.readdirSync "#{output}"
	(fs.unlinkSync "#{output}/" + file) for file in files
	
makeUgly = (err, str, file) ->
	ast = jsp.parse str
	ast = pro.ast_mangle ast
	ast = pro.ast_squeeze ast
	code = pro.gen_code ast
	fs.writeFile (file.replace /\.js/, '.min.js'), code

task 'cleanup', 'cleans up the libs before a release', ->
	clean()
	
task 'build', "builds #{file}", ->
    console.log "building #{file} from coffeescript"
    code = fs.readFileSync "#{source}/#{file}.coffee", 'utf8'
    fs.writeFile "#{output}/#{file}.js", CoffeeScript.compile code
	
task 'minify', "minifies #{file} to a release build", ->
	console.log "minifying #{file}"
	files = fs.readdirSync 'lib'
	files = ("#{output}/" + file for file in files when file.match(/\.js$/))
	(fs.readFile file, 'utf8', (err, data) -> makeUgly err, data, file) for file in files
	
task 'release', 'creates a release of #{file}', ->
    invoke 'cleanup'
    invoke 'build'
    invoke 'minify'

task 'watch', 'Watch prod source files and build changes', ->
    console.log "Watching for changes in #{source}"

    fs.watchFile "#{source}/#{file}.coffee", (curr, prev) ->
        if +curr.mtime isnt +prev.mtime
            console.log "Saw change in #{source}/#{file}.coffee"
            invoke 'build'
