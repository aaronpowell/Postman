(function(){
    
QUnit.module("each");

function run( data, expectedIterations, type ) {
    test("default context " + type, expectedIterations, function() {
        var obj = {
            test: function( item, i, arr ) {
                strictEqual( this , global, "callback default context, data is " + type );
            }
        };
        
        each(data, obj.test );
    });
    
    test("return" + type, 1, function() {
        equal( each(data, function(){return "123";}), undefined, "return value of each, data is " + type );
    })
    
    data && test("loops count" + type, 1, function() {
        var i = 0;    
        
        each( data, function(){
            ++i;
            return false;
        });
        
        equal( i, 1, "exit with return false, data is " + type );
    });

    test("context option" + type, expectedIterations, function() {
        var context = {test: true};
        each( data, function( item, i, arr ) {
            strictEqual( this , context, "context option, data is " + type );
        }, context);
    });
}

run({
    0: 1,
    1: 2
}, 2, "object");

run("12", 2, "string");

run([1,2], 2, "true array");



(function(){
    run(arguments, 2, "collection");
}(1,2))

run(null, 0, "null");
run(undefined, 0, "undefined");

(function(){
    function noop() {};
    noop[0] = 1;
    noop[1] = 2;
    run( noop, 2, "function" )
}())

}());