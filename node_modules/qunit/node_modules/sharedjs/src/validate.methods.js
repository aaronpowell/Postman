/**
 * Validation methods borrowed by https://github.com/jzaefferer/jquery-validation 
 */
(function() {

var validate = exports.validate,
    o;
    
o = validate.options = {
    regexp:  {
        // http://projects.scottsplayground.com/email_address_validation/
        email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
        // http://projects.scottsplayground.com/iri/
        url: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
        dateISO: /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/,
        time:  /^([01][0-9])|(2[0123]):([0-5])([0-9])$/,
        number: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,
        integer: /^-?\d+$/,
        digits: /^\d+$/,
        ziprange: /^90[2-5]\d\{2}-\d{4}$/,
        nowhitespace: /^\S+$/i,
        lettersonly: /^[a-z]+$/i,
        alphanumeric: /^\w+$/i,
        letterswithbasicpunc: /^[a-z-.,()'\"\s]+$/i,
        ipv4: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/i,
        ipv6: /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i  
    },
    regexpSpecial: {
        words: /\b\w+\b/g,
        date: /Invalid|NaN/,
        tags: /<.[^<>]*?>/g,
        whitespaces: /&nbsp;|&#160;/gi,
        digitsanddashes: /[^0-9-]+/,
        numbersandpunkt: /[0-9.(),;:!?%#$'"_+=\/-]*/g,
        nodigets: /\D/g
    }
};

// generate validation functions using regexp
exports.each(o.regexp, function( regexp, name ) {
    validate[name] = function( value ) {
        return regexp.test( value ) || validate.fail( "CUSTOM_" + name.toUpperCase(), "wrong " + name );        
    };
});

validate.date = function( value ) {
    return !o.regexpSpecial.date.test( new Date(value) ) || validate.fail( "CUSTOM_DATE", "wrong date" );        
};

validate.creditcard = function( value ) {
    // accept only digits and dashes
    if ( o.regexpSpecial.digitsanddashes.test(value) ) {
        return false;
    }
    var nCheck = 0,
        nDigit = 0,
        bEven = false,
        n, cDigit, nDigit;
    
    value = value.replace( o.regexpSpecial.nodigets, "" );
    
    for ( n = value.length - 1; n >= 0; n-- ) {
        cDigit = value.charAt(n);
        nDigit = parseInt(cDigit, 10);
        if ( bEven ) {
            if ( (nDigit *= 2) > 9 ) {
                nDigit -= 9;
            }
        }
        nCheck += nDigit;
        bEven = !bEven;
    }
    
    return (nCheck % 10) == 0 || validate.fail( "CUSTOM_CREDITCARD", "wrong creditcard data" );    
};

/**
 * Remove html tags, space chars, numbers and punctuation
 * @param {String} value
 * @return {String}
 * @private
 */ 
function stripHtml(value) {
    return value
        .replace(o.regexpSpecial.tags, " ")
        .replace(o.regexpSpecial.whitespaces, " ")
        .replace(o.regexpSpecial.numbersandpunct, "");
}

validate.maxWords = function( value, max ) {
    return stripHtml(value).match(o.regexpSpecial.words).length < max || validate.fail( "CUSTOM_MAX_WORDS", "too much words" );    
};

validate.minWords = function( value, min ) {
    return stripHtml(value).match(o.regexpSpecial.words).length >= min || validate.fail( "CUSTOM_MIN_WORDS", "too few words" );    
};

validate.rangeWords = function( value, range ) {
    var count = stripHtml(value).match(o.regexpSpecial.words).length;
    return count >= range[0] || count <= range[1] || validate.fail( "CUSTOM_MIN_WORDS", "words count range" );
};

}());