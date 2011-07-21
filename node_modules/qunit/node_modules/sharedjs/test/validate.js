(function(){
// variable
// type validation
// array
// arguments
// object    
// multiple types
// schema validation
// silent
// optional
// default
// reccursive
// regexp
// min
// max
// length
// minlength
// maxlength
// custom using function
// sort

module = QUnit.module;

test("common", 1, function() {
    raises(function() {
        validate(123);    
    }, "bad schema");
});


module("validate variables");

test("type", 4, function() {
    ok( validate(123, "number"), "simple" );
    raises(function() {
        validate("123", "number");    
    }, "simple negative");  
    
    ok( validate( "123", "number|string" ), "regexp type" );
    
    raises(function() {
        validate(null, "number|string");    
    }, "number|string negative test");  

});

test("min", 3, function() {
    ok(validate(5, {
        type: "number",
        min: 3
    }), "correct min 1"); 
    
    ok(validate(5, {
        type: "number",
        min: 5
    }), "correct min 2");     
    
    raises(function(){
        validate(5, {
            type: "number",
            min: 6
        });
    }, "incorrect min");       
});

test("max", 3, function() {
    ok(validate(5, {
        type: "number",
        max: 6
    }), "correct max 1"); 
    
    ok(validate(5, {
        type: "number",
        max: 5
    }), "correct max 2");     
    
    raises(function(){
        validate(5, {
            type: "number",
            max: 4
        });
    }, "incorrect max");       
});


test("minlength", 6, function() {
    ok(validate( "123", {
        type: "string",
        minlength: 2
    }), "data is string 1");
    
    ok(validate( "123", {
        type: "string",
        minlength: 3
    }), "data is string 2"); 
    
    raises(function(){
        validate("123", {
            type: "string",
            minlength: 4
        });
    }, "data is string - negative");  
    
    ok(validate( [1,2,3], {
        type: "array",
        minlength: 2
    }), "data is array 1");
    
    ok(validate( [1,2,3], {
        type: "array",
        minlength: 3
    }), "data is array 2"); 
    
    raises(function(){
        validate([1,2,3], {
            type: "array",
            minlength: 4
        });
    }, "data is array - negative");           
});


test("pattern", 2, function() {


    ok(validate( "123", {
        type: "string",
        pattern: /3/
    }), "string with pattern in schema"); 
    
    raises(function(){
        validate( "123", {
            type: "string",
            pattern: /^3/
        });
    }, "negative test string  with pattern in schema");
       
});

test("custom validation methods", 7, function() {
    ok(validate(123, function( data ) {
        if ( data === 123 ) {
            return true;
        }    
    }), "schema is validation function"); 
    
    raises(function(){
        validate(123, function( data ) {
            if ( data === 123 ) {
                return false;
            }    
        });
    }, "schema is validation function - negative test");    
    
    ok( validate("oleg008@gmail.com", validate.email), "validate email using method directly" ); 
    
    raises(function(){
        validate("oleg008gmail.com", validate.email);
    }, "validate email using method directly, negative test");
    
    ok( validate("oleg008@gmail.com", {custom: "email"} ), "validate email using method name" );   
    
    raises(function(){
        validate("oleg008gmail.com", {custom: "email"});
    }, "validate email using method name, negative test");       

    
    var err = validate("oleg008gmail.com", {custom: "email"}, true );
    equal( err.name, "CUSTOM_EMAIL", "error name is correct" );
});

test("silent errors triggering", 1, function() {
    equal( typeof validate(123, "string", true ), "object", "silent" );
});

module("validate objects and arrays");


test("array", 2, function() {

    ok(validate([1,2], {
        type: "array",
        schema: ["number", "number"]
    }), "array with subschema");
    
    raises(function(){
        validate([1,2], {
            type: "array",
            schema: ["number", "string"]    
        });
    }, "negative test array, 2. element type is wrong");    
    
});


test("arguments simple", 2, function() {

    function fui( path, callback ) {
        return validate(arguments, {
            schema: ["string", "function" ]
        });         
    }

    ok( fui("/test/test/test", function(){}), "arguments with subschema in schema" ); 
    
    raises(function(){
        fui("/test/test/test", "test");
    }, "arguments negative test - wrong type");  
    
});


test("arguments with optional data types", 2, function() {

    function fui( path, callback ) {
        return validate(arguments, {
            schema: ["string|function", "function|undefined"]
        });         
    }

    ok( fui(function(){}), "optional 1. arg path" ); 
    
    raises(function(){
        fui("/test/test/test", "test");
    }, "arguments negative test - wrong type");  
    
});



test("arguments with optional schema param", 3, function() {

    function fui( path, callback ) {
        return validate(arguments, {
            schema: [
                "string",
                {
                    type: "function",
                    optional: true
                }                
            ]    
        });        
    }

    ok( fui("test"), "optional 2. arg callback" ); 
    
    function fui1( path, callback ) {
        var valide = validate(arguments, {
            schema: [
                "string",
                {
                    type: "function",
                    optional: true,
                    "default": function(){ var test = 123; }
                }                
            ]    
        });    
        
        equal(typeof callback, "function", "default value was assigned")
        
        return valide;
    }
    
    ok( fui1("test"),  "using optional and default in arguments" )
        
});

test("functional assertions", 5, function() {
    var schema = { 
        type: "object",
        schema: {
                name: {
                    type: "string",
                    pattern: /^O/,
                    length: 4
                },
                age: {
                    type: "number",
                    min: 23,
                    max: 27
                },
                sex: {
                    type: "string",
                    minlength: 4,
                    maxlength: 6,
                    optional: true
                },
                brother: {
                    type: "object",
                    optional: true,
                    schema: {
                        name: {
                            type: "string",
                            pattern: /^M/
                        },
                        age: {
                            type: "number",
                            min: 23,
                            max: 30
                        }                                                    
                    }
                }        
        }
    }; 
    
    ok(validate({
        name: "Oleg",
        age: 25,
        sex: "male"
    }, schema ), "mixed data 0");
    
    raises(function(){
        validate({
            name: "leg",
            age: 25,
            sex: "male"
        }, schema );             
    }, "mixed data 1");   
    
    ok(validate({
        name: "Oleg",
        age: 25,
        sex: "male",
        brother: {
            name: "Michael",
            age: 30
        }
    }, schema ), "mixed data 2");
    
    ok(validate({
        name: "Oleg",
        sub: {
            name: "Oleg",
            sub: {
                name: "Oleg"
            }
        }
    }, {
        type: "object",
        schema: {
            name: {
                type: "string",
                pattern: /^Oleg/
            },
            sub: {
                type: "object",
                schema: {
                    name: {
                        type: "string",
                        pattern: /^Oleg/
                    },
                    sub: {
                        type: "object"
                    }
                } 
            }
        }    
    }), "recursive"); 
    
    raises(function(){
        validate({
            name: "Oleg",
            sub: {
                name: "Oleg",
                sub: {
                    name: "Oleg"
                }
            }
        }, {
            type: "object",
            schema: {
                name: {
                    type: "string",
                    pattern: /^Oleg/
                },
                sub: {
                    type: "object",
                    schema: {
                        name: {
                            type: "string",
                            pattern: /^Oleg/
                        },
                        sub: {
                            type: "string"
                        }
                    } 
                }
            }    
        });    
    }, "recursive negative test");    
    
});
 
}()); 