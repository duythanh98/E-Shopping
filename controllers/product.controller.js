var productDB = require("../models/product");
var cartDB = require("../models/cart");
var commentDB = require("../models/comment");
var moment = require('moment');

module.exports.detail = function(req,res) {
    var ProId = req.params.id;
    var CatId = req.params.catId;
    var sessionID = req.signedCookies.sessionID;
    
    Promise.all([productDB.single(ProId),
    productDB.getSameCatProduct(CatId),
    cartDB.loadBySession(sessionID),
    commentDB.load(ProId)]).then(([proInfo,sameCatProducts,cart,comment]) => {
        console.log(comment);
        let total = 0;
        cart.forEach(x => {
            total += parseInt(x.ProCurrentPrice)* parseInt(x.ProAmount);
        });
       
        res.render("products/detail",{
            proInfo : proInfo,
            sameCatProducts: sameCatProducts,
            cart: cart,
            total: total,
            comment: comment,
            moment: moment
        });
    }).catch(err => {
        console.log(err);
        res.end();
    })
}

module.exports.archive = function(req,res){
    var CatId = req.params.catId;
    var sessionID = req.signedCookies.sessionID;

    Promise.all([productDB.getSameCatProduct(CatId),
    productDB.getNumberOfProductByCate(CatId),
    cartDB.loadBySession(sessionID)]).then(([sameCatProducts,max,cart]) => {
       
        let total = 0;
        cart.forEach(x => {
            total += parseInt(x.ProCurrentPrice)* parseInt(x.ProAmount);
        });

        res.render("products/archive-page",{
            sameCatProducts: sameCatProducts,
            catID: CatId,
            max: max[0].count,
            cart: cart,
            total: total
        });
    })
   
}

module.exports.cart = function(req,res){
    var sessionID = req.signedCookies.sessionID;

    cartDB.loadBySession(sessionID).then(rows => {
        let total = 0;
        rows.forEach(x => {
            total += parseInt(x.ProCurrentPrice)* parseInt(x.ProAmount);
        });
        res.render("products/cart", {
            cartItems: rows,
            total: total
        });
    }).catch(err => {
        console.log(err);
    })
    
}

module.exports.subCart = function(req,res,next){
    var proID = req.params.proID;
    var sessionID = req.signedCookies.sessionID;

    var checkExistenceOfPro = cartDB.find(sessionID,proID);

    checkExistenceOfPro.then(rows => {
        if(rows.length != 0){
            cartDB.find(sessionID,proID).then(rows => {
                var curAmount = rows[0].ProAmount;
                var newAmount = parseInt(curAmount) - 1;
                
                if(newAmount <= 0)
                {
                    cartDB.delete(sessionID,proID).then(id => {
                        res.redirect("back");
                    })
                }else{
                    cartDB.update(sessionID,proID,newAmount).then(id => {
                        res.redirect("back");
                    })
                }
               
            }).catch(err => {
                console.log(err);
            })
        }else{

            var entity = {
                SessionID: sessionID,
                ProId: proID,
                ProAmount: 1,
                CliId: ''
            }

            cartDB.add(entity).then(id => {
                res.redirect("back");
            }).catch(err => {
                console.log(err);
            })
        }
    })
}

module.exports.remove = function(req,res,next){
    var proID = req.params.proID;

    cartDB.remove(proID).then(id => {
        res.redirect('back');
    }).catch(err => {
        console.log(err);
    })
}

module.exports.addCart = function(req,res,next){
    var proID = req.params.proID;
    var sessionID = req.signedCookies.sessionID;

    var checkExistenceOfPro = cartDB.find(sessionID,proID);

    checkExistenceOfPro.then(rows => {
        if(rows.length != 0){
            cartDB.find(sessionID,proID).then(rows => {
                var curAmount = rows[0].ProAmount;
                var newAmount = parseInt(curAmount) + 1;
                cartDB.update(sessionID,proID,newAmount).then(id => {
                    res.redirect("back");
                })
            }).catch(err => {
                console.log(err);
            })
        }else{

            var entity = {
                SessionID: sessionID,
                ProId: proID,
                ProAmount: 1,
                CliId: ''
            }

            cartDB.add(entity).then(id => {
                res.redirect("back");
            }).catch(err => {
                console.log(err);
            })
        }
    })
    
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

module.exports.postComment = function(req,res,next){

    var comment = req.body.txtComment;
    console.log(comment);
    console.log(req.params.id);
    console.log(req.user);
    var date = new Date();
    
    var entity = {
        Content: comment,
        ProId: req.params.id,
        CliId: req.user.CliId,
        DateUpLoad: date
    }

    commentDB.add(entity).then(id => {
        res.redirect('back');   
    })
}

module.exports.filter = function(req,res,next){
    var type = req.params.type;

    productDB.filterProductByPrice(req.params.catID).then(rows => {

        if(type == 1){
            let proOfTypeOne = rows;
       
            res.render('pagination/pageSearch',{
                allProduct: proOfTypeOne
            });
        }else if (type == 2){

            let proOfTypeTwo = rows.reverse();
            res.render('pagination/pageSearch',{
                allProduct: proOfTypeTwo
            });
        }else if(type == 3){

            let proOfTypeThree = rows.sort((x,y) => {
                return y.PublishedDate.getTime() - x.PublishedDate.getTime();
            })
           
            res.render('pagination/pageSearch',{
                allProduct: proOfTypeThree
            });
        }
       
    })
  
}