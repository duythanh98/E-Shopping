var numeral = require('numeral')

module.exports = function (app) {
    app.locals.formatPrice = function(val) {
    	return numeral(val).format(0, 0);
    }
}