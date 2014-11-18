var mongoose = require('mongoose');

var bookschema = mongoose.Schema({
	path: {
		type: String,
		unique: true
	},
	dir: String,
	filename: String,
	size: String,
	type: String,
	related: Array
});

var Books = mongoose.model('Books',bookschema);
// Books.ensureIndexes();
module.exports = Books;