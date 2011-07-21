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