/**
 * sqliteクラス
 */
const sqlite3 = require("sqlite3")
db = () => {
    const flyhalf = new sqlite3.Database("./flyhalf.db")
    return {
        createTable: () => {
            let teamsStr = ''
            flyhalf.run(`create table if not exists teams(${teamsStr})`)
            /**
                flyhalf.each("select * from teams", (err, row) => {
                console.log(`${row.name} ${row.age}`);
            });
             */

        }
    }
}
module.exports = {
    db
}