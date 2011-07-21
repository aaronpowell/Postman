/**
 * Validation methods borrowed by https://github.com/jzaefferer/jquery-validation 
 */
(function() {

module = QUnit.module;
	
function methodTest( methodName ) {
	return function(value, param) {
        return validate[methodName](value, param) === true ? true : false;
	};
}

module("validate methods");

test("digit", function() {
	var method = methodTest("digits");
	ok( method( "123" ), "Valid digits" );
	ok(!method( "123.000" ), "Invalid digits" );
	ok(!method( "123.000,00" ), "Invalid digits" );
	ok(!method( "123.0.0,0" ), "Invalid digits" );
	ok(!method( "x123" ), "Invalid digits" );
	ok(!method( "100.100,0,0" ), "Invalid digits" );
});

test("url", function() {
	var method = methodTest("url");
	ok( method( "http://bassistance.de/jquery/plugin.php?bla=blu" ), "Valid url" );
	ok( method( "https://bassistance.de/jquery/plugin.php?bla=blu" ), "Valid url" );
	ok( method( "ftp://bassistance.de/jquery/plugin.php?bla=blu" ), "Valid url" );
	ok( method( "http://www.føtex.dk/" ), "Valid url, danish unicode characters" );
	ok( method( "http://bösendorfer.de/" ), "Valid url, german unicode characters" );
	ok( method( "http://192.168.8.5" ), "Valid IP Address" )
	ok(!method( "http://192.168.8." ), "Invalid IP Address" )
	ok(!method( "http://bassistance" ), "Invalid url" ); // valid
	ok(!method( "http://bassistance." ), "Invalid url" ); // valid
	ok(!method( "http://bassistance,de" ), "Invalid url" );
	ok(!method( "http://bassistance;de" ), "Invalid url" );
	ok(!method( "http://.bassistancede" ), "Invalid url" );
	ok(!method( "bassistance.de" ), "Invalid url" );
});

test("email", function() {
	var method = methodTest("email");
	ok( method( "name@domain.tld" ), "Valid email" );
	ok( method( "name@domain.tl" ), "Valid email" );
	ok( method( "bart+bart@tokbox.com" ), "Valid email" );
	ok( method( "bart+bart@tokbox.travel" ), "Valid email" );
	ok( method( "n@d.tld" ), "Valid email" );
	ok( method( "ole@føtex.dk"), "Valid email" );
	ok( method( "jörn@bassistance.de"), "Valid email" );
	ok( method( "bla.blu@g.mail.com"), "Valid email" );
	ok( method( "\"Scott Gonzalez\"@example.com" ), "Valid email" );
	ok( method( "\"Scott González\"@example.com" ), "Valid email" );
	ok( method( "\"name.\"@domain.tld" ), "Valid email" ); // valid without top label
	ok( method( "\"name,\"@domain.tld" ), "Valid email" ); // valid without top label
	ok( method( "\"name;\"@domain.tld" ), "Valid email" ); // valid without top label
	ok(!method( "name" ), "Invalid email" );
	ok(!method( "name@" ), "Invalid email" );
	ok(!method( "name@domain" ), "Invalid email" );
	ok(!method( "name.@domain.tld" ), "Invalid email" );
	ok(!method( "name,@domain.tld" ), "Invalid email" );
	ok(!method( "name;@domain.tld" ), "Invalid email" );
});

test("number", function() {
	var method = methodTest("number");
	ok( method( "123" ), "Valid number" );
	ok( method( "-123" ), "Valid number" );
	ok( method( "123,000" ), "Valid number" );
	ok( method( "-123,000" ), "Valid number" );
	ok( method( "123,000.00" ), "Valid number" );
	ok( method( "-123,000.00" ), "Valid number" );
	ok(!method( "123.000,00" ), "Invalid number" );
	ok(!method( "123.0.0,0" ), "Invalid number" );
	ok(!method( "x123" ), "Invalid number" );
	ok(!method( "100.100,0,0" ), "Invalid number" );
	
	ok( !method( "" ), "Blank is valid" );
	ok( method( "123" ), "Valid decimal" );
	ok( method( "123000" ), "Valid decimal" );
	ok( method( "123000.12" ), "Valid decimal" );
	ok( method( "-123000.12" ), "Valid decimal" );
	ok( method( "123.000" ), "Valid decimal" );
	ok( method( "123,000.00" ), "Valid decimal" );
	ok( method( "-123,000.00" ), "Valid decimal" );
	ok(!method( "1230,000.00" ), "Invalid decimal" );
	ok(!method( "123.0.0,0" ), "Invalid decimal" );
	ok(!method( "x123" ), "Invalid decimal" );
	ok(!method( "100.100,0,0" ), "Invalid decimal" );
});

test("date", function() {
	var method = methodTest("date");
	ok( method( "06/06/1990" ), "Valid date" );
	ok( method( "6/6/06" ), "Valid date" );
	ok(!method( "1990x-06-06" ), "Invalid date" );
});

test("dateISO", function() {
	var method = methodTest("dateISO");
	ok( method( "1990-06-06" ), "Valid date" );
	ok( method( "1990/06/06" ), "Valid date" );
	ok( method( "1990-6-6" ), "Valid date" );
	ok( method( "1990/6/6" ), "Valid date" );
	ok(!method( "1990-106-06" ), "Invalid date" );
	ok(!method( "190-06-06" ), "Invalid date" );
});

test("time", function() {
	var method = methodTest("time");
	ok( method("00:00"), "Valid time, lower bound" );
	ok( method("23:59"), "Valid time, upper bound" );
	ok( !method("24:60"), "Invalid time" );
	ok( !method("24:00"), "Invalid time" );
	ok( !method("29:59"), "Invalid time" );
	ok( !method("30:00"), "Invalid time" );
});

test("minWords", function() {
	var method = methodTest("minWords");
	ok( method("hello worlds", 2), "plain text, valid" );
	ok( method("<b>hello</b> world", 2), "html, valid" );
	ok( !method("hello", 2), "plain text, invalid" );
	ok( !method("<b>world</b>", 2), "html, invalid" );
	ok( !method("world <br/>", 2), "html, invalid" );
});

test("maxWords", function() {
	var method = methodTest("maxWords");
	ok( method("hello", 2), "plain text, valid" );
	ok( method("<b>world</b>", 2), "html, valid" );
	ok( method("world <br/>", 2), "html, valid" );
	ok( !method("hello worlds", 2), "plain text, invalid" );
	ok( !method("<b>hello</b> world", 2), "html, invalid" );
});

test("creditcard", function() {
	var method = methodTest("creditcard");
	ok( method( "446-667-651" ), "Valid creditcard number" );
	ok( !method( "asdf" ), "Invalid creditcard number" );
});



}());