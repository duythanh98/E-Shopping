module.exports = (req, res, next) => {
	if (!req.user) {
		res.redirect('/account/login');
	} else if (req.user.Permission == 1) {
		next();
	} else {
		console.log('Access denied!');
		res.redirect('/');
	}
}