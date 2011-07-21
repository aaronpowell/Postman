#!/usr/bin/env node

var fs = require( "fs" ),
    path = require( "path" ),
    qunit = require( "qunit" ),
    root = path.normalize( __dirname + "/.." ),
    method = process.argv[2],
    tests; 


// load only one specific test
if ( method ) {
    tests = root + "/test/" + method + ".js";
// load all tests
} else {
    tests = [];
    fs.readdirSync( root + "/test" ).forEach( function( test ) {
        if ( /\.js/.test(test) ) {
            tests.push(  root + "/test/" + test );
        }
    });
}
qunit.options.coverage = false;
qunit.run({
    code: root + "/lib/sharedjs.js",
    tests: tests 
});
