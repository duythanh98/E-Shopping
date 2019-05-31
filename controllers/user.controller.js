var userModel = require("../models/user");

module.exports.index = function(req,res){
    var listUser = userModel.all();
    listUser.then(rows => {
        console.log(rows);
        res.render('users/user', {
            users: rows
        })
    }).catch(err => {
        console.log(err);
    })
    
};

module.exports.add = function(req,res){
    res.render('users/add');
};


module.exports.postCreate = function(req,res){
   
    var entity = {
        UserName: req.body.UserName
    }
    console.log(entity);
    userModel.add(entity).then(id => {
        console.log(id);
        res.redirect('/users');
    }).catch(err => {
        console.log(err);
    })
};

