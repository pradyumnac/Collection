var mongoose = require('mongoose');

var bookschema = mongoose.Schema({
	path: {
		type: String,
		unique: 'True',
		index: 'True'
	},
	dir: String,
	filename: String,
	size: String,
	type: String,
	related: Array
});

var Books = mongoose.model('Books',bookschema);
// var Books = mongoose.model('Books');
// var a = new Books ({'path':'123'});
// console.log( a);

module.exports = Books;