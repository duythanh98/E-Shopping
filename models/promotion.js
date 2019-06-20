var db = require("../common/db");

module.exports = {
	all: () => {
		return db.load('select * from promotions');
	},
	single: id => {
		return db.load(`SELECT * FROM promotions WHERE PromId = ${id}`);
	},
	add: entity => {
		return db.add('promotions', entity);
	},
	update: entity => {
		return db.update('promotions', 'PromId', entity);
	},
	delete: id => {
		return db.delete('promotions', 'PromId', id);
	},
}