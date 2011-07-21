(function(){
    
QUnit.module("inherits");

function Human(){}
Human.prototype.type = "Human";

function Me(){}

inherits(Me, Human);

test("main", function(){
    ok( new Me instanceof Human, "instance of Me is instance of Human" );
    ok( new Me instanceof Me, "instance of Me" );
    equal( (new Me).type, "Human", "super proto property was inherited" );
    notEqual( Me.prototype, Human.prototype, "both has different prototypes" );
});

}());