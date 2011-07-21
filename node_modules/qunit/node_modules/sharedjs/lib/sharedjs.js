(function( global, undefined ) { 

var exports;

if ( typeof module !== "undefined" && module.exports !== undefined ) {
    exports = module.exports;
} else {
    exports = global.$ = {};
}
/**
 * Change execution context of a function
 * @param {Function} fn,
 * @param {Object} context
 * @return {Function}
 */
exports.bind = (function() {
    
    var slice = Array.prototype.slice,
        bind = Function.prototype.bind || function( context ) {
            var fn = this;
            return function() {
                return fn.apply( context, arguments );        
            };
        };
    
    return function( fn, context /*, arg1, arg2, arg3 */ ) {
        return bind.apply( fn, slice.call( arguments, 1 ) );
    };        
}());
/**
 * Iterate through an array, object, string, buffer, function object
 * @param {Mixed} obj
 * @param {Function} fn
 * @param {Object} context optional
 * @return {Undefined}
 */
exports.each = (function() {
    
    var TypeError = global.TypeError || function TypeError(){};

    return function( obj, fn, context ) {
        if ( obj == null ) {
            return;
        }

        var fnType = typeof fn,
            i;

        // it is not an array with native forEach method - throw exeption
        if ( fnType !== "function" ) {
            throw new TypeError( fnType + " is not a function" );    
        }
        
        if ( exports.type( obj ) === "array" ) {
            for ( i=0; i<obj.length; ++i ) {
                if ( fn.call( context, obj[i], i, obj ) === false ) {
                    return;
                }                 
            }    
        } else {
            for ( i in obj ) {
                if ( fn.call( context, obj[i], i, obj ) === false ) {
                    return;
                }            
            }
        }
    };
}());
exports.env = {
    dev: true,
    client: true,
    mozilla: true,
    msie: true,
    webkit: true,
    opera: true,
    vervsion: 1.3    
};
/**
 * Don't throw erros in production mode on the client
 * 
 * @param {String} msg
 */
exports.error = (function(){
    
    var Error = global.Error,
        env = exports.env;
    
    return function( msg ) {
        if ( !msg || ( env.client && !env.dev ) ) {
            return;    
        }
        
        throw new Error( msg );
    };    
}());

/**
 * Merge objects to the first one
 * @param {Boolean|Object} deep if set true, deep merge will be done
 * @param {Object}  obj
 * @return {Object}
 */
exports.extend = (function(){
    
    var toString = Object.prototype.toString,
        obj = '[object Object]';

    return function extend( deep /*, obj1, obj2, obj3 */ ) {
        // take first argument, if its not a boolean
        var args = arguments,
            i = deep === true ? 1 : 0,
            key,
            target = args[i];
        
        for ( ++i; i < args.length; ++i ) {
            for (key in args[i]) {
                if ( deep === true && 
                     target[key] && 
                     // if not doing this check you may end in
                     // endless loop if using deep option
                     toString.call(args[i][key]) === obj &&
                     toString.call(target[key]) === obj ) {
                         
                    extend( deep, target[key], args[i][key] );    
                } else {
                    target[key] = args[i][key];
                }            
            }
        }  
              
        return target;    
    };
}());

exports.filter = function() {
    
};

exports.indexOf = function() {
    
};

/**
 * Inherit prototype properties
 * @param {Function} ctor
 * @param {Function} superCtor
 */
exports.inherits = (function(){
    function noop(){}
 
    function ecma3(ctor, superCtor) {
        noop.prototype = superCtor.prototype;
        ctor.prototype = new noop;
        ctor.prototype.constructor = superCtor;
    }
    
    function ecma5(ctor, superCtor) {
        ctor.prototype = Object.create(superCtor.prototype, {
            constructor: { value: ctor, enumerable: false }
        });
    }
    
    return Object.create ? ecma5 : ecma3;
}());
exports.lastIndexOf = function() {
    
};

exports.map = function() {
    
};

exports.noop = function(){};

/**
 * Returns the current time in milliseconds.
 * @return {Number}
 */
exports.now = Date.now || function() {
    return new Date().getTime();    
};

/**
 * Convert a collection or any other type to an Array
 * @param {Mixed} obj
 * @param {Number} beginIndex optional
 * @param {Number} endIndex optional
 * @return {Array}
 */
exports.toArray = (function() {

    var push = Array.prototype.push,
        slice = Array.prototype.slice,
        toString = Object.prototype.toString,
        arr = "[object Array]",
        object = "[object Object]",
        // V8 returns by arguments
        args = "[object Arguments]";
    
    return function( obj, beginIndex, endIndex ) {
        var type = toString.call( obj );
        // this is a true array
        if ( type === arr ) {
            // startIndex could be also negative
            return beginIndex != null || endIndex != null ? slice.call( obj, beginIndex, endIndex ) : obj;
        // its collection    
        } else if ( obj.length != null && ( type === object || type === args ) ) {
            return slice.call( obj, beginIndex, endIndex );
        // any other type
        } else {
            return [obj];
        }
    };
}());

/**
 * Returns a string without any leading or trailing whitespace, newlines and tabs.
 * @param {String} str
 * @return {String} always returns a string
 */
exports.trim = (function(){
    var rTrim = /^\s+|\s+$/,
        trim = String.prototype.trim || function() {
             return this.replace( rTrim, "" );               
        };
    
    return function( str ) {
        return str ? trim.call( str ) : "";  
    };
}());
/**
 * Type detection (inspired by jQuery)
 * @param {Object} obj
 * @param {String} expType
 * @return {String|Boolean}
 */
exports.type = (function() {
    var i,
        String = global.String,
        toString = global.Object.prototype.toString,
        types = ["Boolean", "Number", "String", "Function", 
                 "Array", "Date", "RegExp", "Object"],
        class2type = {};
        
    // create a static classes hash
    for ( i=0; i < types.length; ++i ) {
        class2type[ "[object " + types[i] + "]" ] = types[i].toLowerCase();
    }

    return function( obj, expType ) {
        var type = obj == null ? String( obj ) : class2type[ toString.call(obj) ] || "object";

        if ( expType ) {
            return expType === type ? true : false;
        }
        
        return type;
    };
}());
(function(){
    
var RegExp = global.RegExp,
    errPrefix = "Schema validation error, ";

function ValidationError( name, message ) {
    this.name = name;
    this.message = errPrefix + message;
}
exports.inherits(ValidationError, Error);

ValidationError.prototype.toString = function() {
    return this.name + ": " + this.message;    
};

function fail( name, message ) {
    return new ValidationError( name, message );    
}    

/**
 * Validate one variable. 
 * @param {Mixed} data
 * @param {Object|String} schema 
 * @param {String} name current property name
 * @return {Boolean|Object}
 * @private
 */
function validateOne( data, schema, name ) {
    var schemaType = exports.type( schema ),
        dataType,
        ret;
    
    if ( schemaType === "string" ) {
        schema = {type: schema};
    } else if ( schemaType !== "object" && schemaType !== "function" ) {
        throw fail( "BAD_SCHEMA", "bad schema" + name );   
    }
    
    // check type
    if ( schema.type ) {
        dataType = exports.type( data );
        // handle simple type string and regexp string e.g. "string|function"
        if ( schema.type !== dataType && !(new RegExp(schema.type)).test(dataType)) {
            return fail( "TYPE", "Found " + dataType + ", but expected " + schema.type + name );
        }   
    }

    if ( schemaType === "function" || schema.custom ) {
        if ( schemaType === "function" ) {
            ret = schema(data);
        } else if ( typeof schema.custom === "string" ) {
            ret = validate[schema.custom](data);
        // schema.custom schould be a function
        } else {
            ret = schema.custom(data);
        }
        
        if ( ret === false ) {
            ret = fail( "CUSTOM_DEFAULT", "custom validation failed" + name );
        }
        return ret;
    }
        
    // min and max
    if ( schema.min != null || schema.max != null ) {
        if ( schema.type !== "number" ) {
            throw fail( "MIN_MAX_FOR_NUMBERS_ONLY", "min and max can be used with numbers only" + name );   
        } 
        if ( data < schema.min || data > schema.max ) {
            return fail( "MIN_MAX", "Found " + data + ", but expected " + schema.min + "-" + schema.max + name );
        }       
    }    
   
    // check length 
    if ( schema.length != null && data.length !== schema.length ) {
        return fail( "LENGTH", "Found " + data.length + ", but expected " + schema.length + name );
    }
    
    // minlength and maxlength
    if ( schema.minlength != null || schema.maxlength != null ) {
        // length is an range array           
        if ( data.length < schema.minlength || data.length > schema.maxlength ) {
            return fail( "MINLENGTH_MAXLENGTH", "Found " + data.length + ", but expected " + schema.minlength + "-" + schema.maxlength + name );
        }        
    }
    
    // check pattern
    if ( schema.pattern && !schema.pattern.test(data) ) {
        return fail( "PATTERN", "pattern mismatch" + name );
    }
    
    return true;         
}

/**
 * Validate variable or object. 
 * @param {Mixed} data
 * @param {Object|String} schema 
 * @param {Boolean} silent optional, don't throw errors, just return error message or false
 * @return {Boolean|String}
 * @public
 */
function validate( data, schema, silent ) {
    
    if ( schema.optional && !data ) {
        return true;
    }
    
    var ret = validateOne( data, schema, "" );

    if ( ret !== true && !silent ) {
        throw ret;
    }
    
    // schema contains schema
    if ( schema.schema ) {
        (function rec(schema, data) {
            if ( !schema ) {
                return;
            }
            
            exports.each( schema, function( schema, key ) {
                // if the prop is optional and data is not set
                if ( schema.optional && data[key] === undefined ) {
                    if ( schema["default"] ) {
                        data[key] = schema["default"];    
                    }
                    return;
                } 
        
                
                ret = validateOne( data[key], schema, " (" + key + ")" );
                
                if ( ret !== true ) {
                    if ( silent ) {
                        // quit the each loop    
                        return false;
                    } else {
                        throw ret;
                    }
                }
                
                if ( schema.schema ) {
                    rec( schema.schema, data[key] );
                }
            });
        }(schema.schema, data));
    }
    
    return ret;       
}

exports.validate = validate;

validate.fail = fail;

}());
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
}(typeof global === "undefined" ? this : global));