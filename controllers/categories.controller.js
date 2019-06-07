// var categoryModel = require("../models/category");
// var listCategory = categoryModel.all();

// module.exports.index = function(req,res){
//     var listCategory = categoryModel.all();
//     listCategory.then(rows => {
//         res.render("categories/index", {
//             list : rows
//         });
//     }).catch(err => {
//         console.log(err);
//     })
// };

module.exports.add = function(req,res){
    res.render("categories/add");
};

module.exports.addPost = function(req,res){
    var entity = {
        CatName: req.body.CatName
    }

    categoryModel.add(entity).then(id => {
        res.render("categories/add");
    }).catch(err => {
        console.log(err);
    })
};

module.exports.update = function(req,res){
    res.render("categories/update")
}