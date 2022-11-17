const { v4: uuidv4 } = require('uuid');
const auth = require('../auth')

const TABLE = 'user';

module.exports = function(injectedStore){

    let store = injectedStore;

    if(!store){
        store = require('../../../store/dummy');
    }

    function list(){
        return store.list(TABLE)
    }

    function get(id){
        return store.get(TABLE, id)
    }

    function followers(id){
        const join = {}
        join[TABLE] = 'user_to'
        return store.query(TABLE + '_follow', {user_from: id}, join)
    }

    function follow(from, to){
        return store.upsert(TABLE + '_follow', {
            user_from: from,
            user_to: to
        })
    }

    async function upsert(body){
        const user = {
            name: body.name,
            username: body.username,
            password: body.password
        }

        if(body.id){
            user.id = body.id;
        }
        else {
            user.id = uuidv4()
        }

        if(body.password || body.username){
            await auth.upsert({
              id: user.id,
              username: user.username,
              password: user.password
            })
        }

        return store.upsert(TABLE, user)

    }

    function remove(id){
        return store.remove(TABLE, id)
    }

    return {
        list,
        get,
        upsert,
        remove,
        follow,
        followers
    }
}
