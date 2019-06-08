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
   
    Promise.all([productDB.getSameCatProduct(CatId),
    productDB.getNumberOfProductByCate(CatId)]).then(([sameCatProducts,max]) => {
       
        res.render("products/archive-page",{
            sameCatProducts: sameCatProducts,
            catID: CatId,
            max: max[0].count
        });
    })
   
}

module.exports.cart = function(req,res){
    res.render("products/cart");
}

module.exports.pageByCat = function(req,res){

    //Pagination
    var page = req.params.page;
    let perPage = 5;
    let proPerPage = perPage * (page-1);
    
    //Get current category
    var catID = parseInt (req.params.catID);
    console.log(page);
    productDB.pageByCate(catID,page,proPerPage).then(rows => {
        res.render('pagination/page',{
            allProduct: rows
        });
    }).catch(err => {
        console.log(err);
    })
    
}