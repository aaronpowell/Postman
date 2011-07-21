/**
 * Returns the current time in milliseconds.
 * @return {Number}
 */
exports.now = Date.now || function() {
    return new Date().getTime();    
};