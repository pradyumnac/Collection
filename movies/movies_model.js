var mongoose = require('mongoose');

var moviesschema = mongoose.Schema({
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

var movies = mongoose.model('movies',moviesschema);
movies.ensureIndexes();
module.exports = movies;