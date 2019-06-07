var productDB = require("../models/product");


module.exports.detail = function(req,res) {
    var ProId = req.params.id;
    var CatId = req.params.catId;
    
    Promise.all([productDB.single(ProId),
    productDB.getSameCatProduct(CatId)]).then(([proInfo,sameCatProducts]) => {
        res.render("products/detail",{
            proInfo : proInfo,
            sameCatProducts: sameCatProducts
        });
    }).catch(err => {
        console.log(err);
        res.end();
    })
}

module.exports.archive = function(req,res){
    var CatId = req.params.catId;

    Promise.all([productDB.getSameCatProduct(CatId)]).then(([sameCatProducts]) => {
        res.render("products/archive-page",{
            sameCatProducts: sameCatProducts
        });
    })
   
}

module.exports.cart = function(req,res){
    res.render("products/cart");
}