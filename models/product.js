
var db = require("../common/prodb");


function loadAll() {
    return db.load("SELECT * FROM product")
}

function addCat(entity){
    return db.add(entity);
}
module.exports = {
    all: loadAll,
    add: addCat
}