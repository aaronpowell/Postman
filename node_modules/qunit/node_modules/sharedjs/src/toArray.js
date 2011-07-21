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
