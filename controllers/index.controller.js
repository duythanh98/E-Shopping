var productDB = require('../models/product');
var catDB = require('../models/category');
module.exports.home = function(req,res){
    
    Promise.all([productDB.all(),
    productDB.newProduct(),
    catDB.topCat(),
    productDB.topSellProduct()])
    .then(([allProduct, newProducts, topCats, topSellPros]) => {
        console.log(topSellPros);
        res.render("home", {
            allProduct: allProduct,
            newProducts: newProducts,
            popCats: topCats.slice(0,6),
            topCats: topCats,
            topSellPros: topSellPros
        });
    }).catch(err => {
        console.log(err);
    })
    
};