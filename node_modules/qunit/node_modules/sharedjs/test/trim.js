QUnit.module("trim");
test("main", function() {
    equal( trim(" My String"), "My String", "case 1" );
    equal( trim("My String "), "My String", "case 2" );
    equal( trim(" My String "), "My String", "case 3");
    equal( trim("\n My String \n"), "My String", "case 4" );
    equal( trim("\t My String \t"), "My String", "case 5" );
    equal( trim(null), "", "case 6" );
    equal( trim(undefined), "", "case 7" );
    equal( trim({}), "[object Object]", "case 8" );
    equal( trim([]), "", "case 9" );    
});
