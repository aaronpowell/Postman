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