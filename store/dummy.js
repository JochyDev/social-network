const db = {
    'user': [
        {id: '1', name: 'Carlos'},
        {id: '2', name: 'Juan'},
        {id: '3', name: 'Pedro'},
    ]
};


async function list(table){
    return db[table];
}

async function get(table, id){
    let col = await list(table);
    return col.filter( item => item.id === id)[0] || null;
}

async function upsert(table, data){
    db[table].push(data)
    return data
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

module.exports = {
    list,
    get,
    upsert,
    remove
}