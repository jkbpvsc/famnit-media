// returns rows
async function queryDatabase(query) {
    let response;
    await new Promise((resolve, reject) => {
        db.query(query, (err, rows)=> {
        if(err) {
            console.log(err)
            reject(err)
        }
        else {
            if( Array.isArray(rows) && rows.length > 0) {
                response = rows;
                resolve()
            }
            if(rows !== undefined) {
                resolve()
            }
        }
    });
})
return response || []
}

// inserts row into the db
async function insertIntoDatabase(query, data) {

    await new Promise((resolve, reject) => {
        db.query(query, data, (err, result)=> {
        if(err) {
            reject(err)
        }
        else {
            if(result != undefined) {
                resolve()
            }
        }
    });
})
}


module.exports = {
    queryDatabase,
    insertIntoDatabase
}