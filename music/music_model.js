var mongoose = require('mongoose');

var Musicschema = mongoose.Schema({
	path: {
		type: String,
		unique: true
	},
	dir: String,
	filename: String,
	size: String,
	type: String
});

var Music = mongoose.model('Music',Musicschema);
Music.ensureIndexes();
module.exports = Music;