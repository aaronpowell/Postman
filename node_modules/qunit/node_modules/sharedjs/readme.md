## Idea of this project

Provide a bunch of most needed high level javascript utility functions, which will work in every browser and in nodejs. 
The Goal is to make writing shared code easier. 
The dream is to be also dependency N1 for all node modules, to avoid that every module implements its own "each", "extend" etc. methods.   

## Philosophy

- high level api with lots of sugar
- focused on speed (benchmarks for every test case)
- no native prototype extensions, no global namespace polution (be compartible to insecure env)
- use of ecma5 features if available and be ecma5 compatible if possible 
- don't reinvent the wheel, if there are parts of libs we could use - do it
- every function is as standalone as possible, to reduce dependencies (only if code overhead is minimal)
- no performance overhead for the server because of client support
- well tested
- community driven
- intelligent build tool (include only what you need)

## Installation
npm

	$ npm install sharedjs
	
git

	$ git clone https://github.com/kof/sharedjs.git
	$ git submodule update --init

## API

	var $ = require("sharedjs");

### $.each(data, callback, [context]);

Iterates over array, object or string, calls callback function once per data element.
Quit the loop using "return false;" inside of callback.

- `data` - object, array or string
- `callback` - function
- `context` - object optional


Similar ecma 5 concepts are:

- Array.prototype.forEach https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
- Array.prototype.some https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
- Array.prototype.every https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every

### $.extend([deep], target, object1, [objectN]);

Merge the contents of two or more objects together into the first object. 

- `deep` If true, the merge becomes recursive.
- `target` The object to extend. It will receive the new properties.
- `object1` An object containing additional properties to merge in.
- `objectN` Additional objects containing properties to merge in.


	var object = $.extend({}, object1, object2);

Inspierd by jQuery
http://api.jquery.com/jQuery.extend/
	
### $.bind(block, [context], [arg1], [arg2], [argN]);

Creates a new function that, when called, itself calls this function in the context of the provided this value, with a given sequence of arguments preceding any provided when the new function was called.

https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind

### $.inherits(constructor, superConstructor);

Inherit the prototype methods from one constructor into another. This concept is used in nodejs "util" module and googles closure library.

### $.validate(data, schema, [silent]);

Validate any type of data. Throws error if data can't pass validation schema.

- `data` can be any data type, f.e. string, number, object, array, arguments
- `schema` string, array or object containing schema definitions
- `silent` silent mode switch - no errors will be threw

