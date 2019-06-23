module.exports = (req,res,next) => {
    if(!req.user) {
    	req.locals.retUrl = req.originalUrl;
    	console.log(req.locals.retUrl);
        res.redirect('/auth/login');
    } else {
        next();
    }
}