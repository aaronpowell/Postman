QUnit.module("toArray");
test("main", function() {
    deepEqual( toArray([1,2,3]), [1,2,3], "true array" );
    deepEqual( toArray([1,2,3], 1, 2), [2], "true array sliced" );
    deepEqual( toArray( {test:123} ), [ { test: 123 } ], "object" );
    deepEqual( toArray( "test" ), [ "test" ], "string" );
    deepEqual( toArray( 123 ), [ 123 ], "number" );
    deepEqual( toArray( true ), [ true ], "boolean" );
});

test("date", function() {
    var date = new Date();
    deepEqual( toArray( date ), [ date ], "date" );
});

test("arguments", function() {
    (function(){
        deepEqual( toArray( arguments ), [ 123 ], "collection" );
    }(123));
    
    (function(){
        deepEqual( toArray( arguments, 1, 2 ), [ 2 ], "sliced collection" );
    }(1, 2, 3));    
    
    (function(){
        deepEqual( toArray( arguments ), [], "empty collection" );
    }());    
});