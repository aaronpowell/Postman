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