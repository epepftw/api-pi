import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const dbName = 'database.db';
const db_file = `${path.resolve(__dirname)}/${dbName}`;

const db = (async function() {
    try {
        return await open({
            filename: db_file,
            driver: sqlite3.Database
        })
    } catch (err) {
        console.log(err);
    }
})();

export default db;