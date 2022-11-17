module.exports = function(injectedStore){

    let store = injectedStore;

    if(!store){
        store = require('../../../store/dummy');
    }

    function list(){
        
    }
}