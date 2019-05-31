var db = require("../common/userdb");

function loadAll() {
    return db.load("SELECT * FROM user")
}

function addUser(entity){
    return db.add(entity);
}
module.exports = {
    all: loadAll,
    add: addUser
}