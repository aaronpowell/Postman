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
