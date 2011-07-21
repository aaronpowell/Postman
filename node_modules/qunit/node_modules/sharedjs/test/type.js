QUnit.module("type");
test("main", function() {
    ok( type( undefined, "undefined" ), "undefined works" );
    ok( type( true, "boolean" ), "boolean works" );
    ok( type( false, "boolean" ), "boolean works" );
    ok( type( new Boolean, "boolean" ), "boolean works" );
    ok( type( null, "null" ), "null works" );
    ok( type( "test test", "string" ), "string works" );
    ok( type( new String, "string" ), "string works" );
    ok( type( 12345, "number" ), "number works" );
    ok( type( new Number, "number" ), "number works" );
    ok( type( {}, "object" ), "object works" );
    ok( type( new Object, "object" ), "object works" );
    ok( type( [], "array" ), "array works" );
    ok( type( new Array, "array" ), "array works" );
    ok( type( /$/i, "regexp" ), "regexp works" );
    ok( type( new RegExp, "regexp" ), "regexp works" );
    ok( type( new Date, "date" ), "date works" );    
});