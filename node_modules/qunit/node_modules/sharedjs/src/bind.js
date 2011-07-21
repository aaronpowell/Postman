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