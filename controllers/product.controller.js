var productModel = require("../models/product");

module.exports.index = function(req,res) {
    var listProduct = productModel.all();
    listProduct.then(rows => {
        console.log(rows);
        res.render("products/index", {
            list : rows
        });
    }).catch(err => {
        console.log(err);
    })
}

module.exports.detail = function(req,res) {
    res.render("products/detail");
}

module.exports.archive = function(req,res){
    res.render("products/archive-page");
}

module.exports.cart = function(req,res){
    res.render("products/cart");
}