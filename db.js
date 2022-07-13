var sqlite3_db = require('better-sqlite3');

const DBSOURCE = "db.sqlite";
// const DBSOURCE = ":memory:";


let user_table_query = `
    CREATE TABLE IF NOT EXISTS user (
        user_id integer PRIMARY KEY AUTOINCREMENT,
        username text, 
        password text
    )
`;



let db = new sqlite3_db(DBSOURCE, { verbose: console.log });
console.log('Connected to the SQLite database.');

// USER TABLE CREATE
let user_table_stmt = db.prepare(user_table_query);
user_table_stmt.run();
console.log('user table created to the SQLite database.');

// INIT USER
generateUser()

// HARD PARAM
let begin = db.prepare('BEGIN');
let commit = db.prepare('COMMIT');
let rollback = db.prepare('ROLLBACK');

// Generate User
function generateUser(){

    const username = "admin"
    const password = "123456"

    // CHECK USER EXISTS
    let search_stmt = db.prepare(
        `
            SELECT username
            FROM user 
            WHERE username = '${username}'
        `
    );

    let check_result = search_stmt.get();
    if(check_result){
        return;
    }

    // ADD NEW USER
    let insert_user_stmt = db.prepare(
        `
            INSERT INTO user(username, password)
            VALUES (
                '${username}',
                ${password}
            )
        `
    );
    let insert_user_info = insert_user_stmt.run();
    user_id = insert_user_info.lastInsertRowid;
    console.log('user created : ' + username.toString() + ' | password: ' + password.toString());
}


exports.db = db;
exports.begin = begin;
exports.commit = commit;
exports.rollback = rollback;
exports.generateUser = generateUser;