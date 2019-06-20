
var db = require("../common/db");

module.exports = {
	all: () => {
		return db.load('select * from categories');
	},
	popularCat: () => {
		return db.load("SELECT cat.CatId, cat.CatName, COUNT(pro.ProId) as count , pro.ProImg as img FROM products as pro, categories as cat  WHERE pro.ProCat = cat.CatId GROUP BY cat.CatId ,cat.CatName ORDER by COUNT(pro.ProId) DESC LIMIT 3");
	},
	topCat: () => {
		return db.load("SELECT cat.CatId, cat.CatName, COUNT(pro.ProId) as count , pro.ProImg as img FROM products as pro, categories as cat  WHERE pro.ProCat = cat.CatId GROUP BY cat.CatId ,cat.CatName ORDER by COUNT(pro.ProId) DESC LIMIT 13");
	},
}