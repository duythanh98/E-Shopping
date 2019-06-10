var db = require("../common/db");

module.exports = {
    all: () => {
        return db.load('select * from products');
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
    },
    page: (page,offset)=> {
        return db.load(`SELECT * FROM products 
        limit ${page} 
        offset ${offset}`);
    },
    pageByCate: (catID, limit ,offset ) => {
        return db.load(`SELECT * FROM products 
        WHERE ProCat = ${catID} 
        LIMIT ${limit} 
        offset ${offset}`);
    },
    getNumberOfProductByCate: (catID) => {
        return db.load(`SELECT COUNT(ProId) as count
        FROM products
        WHERE ProCat = ${catID}
        GROUP BY ProCat`)
    },
    searchProductByName: (textSearch) => {
        return db.load(`SELECT * FROM products WHERE MATCH(ProName) against('${textSearch}')`);
    },
    filterProductByPrice: (catID) => {
        return db.load(`SELECT * FROM products
        WHERE ProCat = ${catID} 
        ORDER by ProCurrentPrice DESC
        LIMIT 6`);
    }
}