var db = require("../common/db");

module.exports = {
    all: () => {
        return db.load('select * from products limit 10');
    },
    newProduct: () => {
        return db.load('SELECT * FROM products ORDER BY PublishedDate DESC LIMIT 6');
    },
    topSellProduct: () => {
        return db.load('SELECT * FROM products ORDER BY Sold DESC LIMIT 10');
    },
    single: id => {
        return db.load(`SELECT * FROM products WHERE ProId = ${id}`);
    },
    getSameCatProduct: CatId => {
        return db.load(`SELECT * FROM products WHERE ProCat = ${CatId} LIMIT 6`);
    }
}