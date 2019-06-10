var db = require("../common/db");

module.exports = {
    singleByUsername: username => {
        return db.load(`SELECT * FROM clients WHERE CliUserName = '${username}'`);
    },
    add: (entity) => {
        return db.add('clients',entity);
    },
    find: (id) => {
        return db.load(`SELECT * FROM clients WHERE CliId = ${id}`);
    }
}