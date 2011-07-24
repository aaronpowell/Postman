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
    for f in fs.readdirSync source
      fn = f.split('.')[0]
      code = fs.readFileSync "#{source}/#{fn}.coffee", 'utf8'
      fs.writeFile "#{output}/#{fn}.js", CoffeeScript.compile code
	
task 'minify', "minifies #{file} to a release build", ->
	console.log "minifying #{file}"
	files = fs.readdirSync 'lib'
	files = ("#{output}/" + f for f in files when f.match(/\.js$/))
	(fs.readFile f, 'utf8', (err, data) -> makeUgly err, data, f) for f in files
	
task 'release', "creates a release of #{file}", ->
    invoke 'cleanup'
    invoke 'build'
    invoke 'tests'
    invoke 'minify'
    
task 'tests', "run tests for #{file}", ->
    console.log 'Time for some tests!'
    runner = require 'qunit'
    sys = require 'sys'
    colors = require 'colors'
    test = 
      code: "./#{output}/#{file}.js",
      tests: "./test/tests.js"

    runner.options.summary = false
      
    report = (r) ->
      if r.errors
        sys.puts 'Uh oh there were errors'.bold.red
      else
        sys.puts 'All test pass'.green
      
    runner.run test, report

task 'watch', 'Watch prod source files and build changes', ->
    console.log "Watching for changes in #{source}"

    fs.watchFile "#{source}/#{file}.coffee", (curr, prev) ->
        if +curr.mtime isnt +prev.mtime
            console.log "Saw change in #{source}/#{file}.coffee"
            try
              invoke 'build'
              console.log 'build complete'
              invoke 'tests'
            catch e
              console.log 'Oh snap, someething went wrong!'
              console.log e
