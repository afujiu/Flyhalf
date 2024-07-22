/**
 * sqliteクラス
 */
const sqlite3 = require("sqlite3")
db = () => {
    const flyhalf = new sqlite3.Database("./flyhalf.db")
    return {
        createTable: () => {
            let key = 'aiueo2'
            let name = 'あいうえお2'
            let token = 'aiueo:tetete'
            flyhalf.run("CREATE TABLE IF NOT EXISTS tenant (id INTEGER PRIMARY KEY, key TEXT, name TEXT,token TEXT)");
            const stmt = flyhalf.prepare(`INSERT INTO tenant (key,name,token) VALUES(?,?,?)`);
            stmt.run(key,name,token);
            stmt.finalize();
            flyhalf.each("select * from tenant", (err, row) => {
                console.log(row);
            });
        }
    }
}
module.exports = {
    db
}

db().createTable()