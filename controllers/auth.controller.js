
module.exports.login = function(req,res){
    res.render('auth/login');
}

module.exports.payment = function(req,res){
    res.render('auth/payment');
}

module.exports.register = function(req,res) {
    res.render('auth/register');
}