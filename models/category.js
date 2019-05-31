
var db = require("../common/catdb");


function loadAll() {
    return db.load("SELECT * FROM category")
}

function addCat(entity){
    return db.add(entity);
}
module.exports = {
    all: loadAll,
    add: addCat
}