const db = {
    'user': [
        {id: '1', name: 'Carlos'},
        {id: '2', name: 'Juan'},
        {id: '3', name: 'Pedro'},
    ]
};


async function list(table){
    return db[table] || [];
}

async function get(table, id){
    let col = await list(table);
    return col.filter( item => item.id === id)[0] || null;
}

async function upsert(table, data){
    if(!db[table]){
        db[table] = []
    }

    db[table].push(data)
}

async function remove(table, id){
    let col = await list(table);
    let deleteItem;

    col.forEach((item, idx) => {
        if(item.id === id){
            deleteItem = item
            db[table].splice(idx, 1)
        }
    })

    return deleteItem 
}

async function query(table, q){
    let col = await list(table);
    let keys = Object.keys(q);
    let key = keys[0]

    return col.filter( item => item[key] === q[key])[0] || null;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}