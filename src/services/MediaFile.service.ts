import db from '../db/Config';
import download from 'download';
import path from 'path';

const sqlstring = require('sqlstring-sqlite');

export const clearContentsTable = async () => {
    try {
        await (await db)!.run('DELETE FROM content');
        return ('Content Table Cleared');
    } catch (error) {
        console.log(error)
    }
}

export const getAllContents = async () => {
    try {
        return await (await db)!.all("SELECT * FROM content");
    } catch (error) {
        console.log(error);
    } 
}

export const saveContents = async (data: any[]) => {
    try {
        data.map(
            async (i: any) => {
                await (await db)!.all(`INSERT INTO content ('filename', 'url') VALUES (${sqlstring.escape(i.filename)}, ${sqlstring.escape(i.url)})`);
            }
        )

        return ({ message: 'Player Data Saved to Player Database'});
    } catch (error) {
        console.log(error)
    }
}

export const downloadContents = async (data: any[]) => {
    try {
        await Promise.all(
            data.map(async(i: any) => {
                console.log('Downloading', i.filename);
                await download(i.url, path.join(__dirname, '../public'));
            })
        )
    } catch (error) {
        console.log(error);
    }
}