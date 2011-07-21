QUnit.module("bind");

test("all", 5, function() {
    equal( typeof bind( function(){ return 123 } ), "function", "return value of bind" );
    equal( bind( function(){ return 123; } )(), 123, "return value of the bound function" );
    equal( bind( function(){ return this.test; }, {test: 123} )(), 123, "check bound function context" );
    deepEqual( bind( function(){ return this; } )(), {}, "check context if nothing passed" );
    
    function argumentsTest(){ 
        return arguments; 
    } 
    
    deepEqual( bind( argumentsTest )(1,2,3), argumentsTest(1,2,3), "additional arguments" );    
});
