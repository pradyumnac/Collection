var mongoose = require('mongoose');

var Musicschema = mongoose.Schema({
	path: {
		type: String,
		unique: 'True',
		index: 'True',
		trim: 'True'
	},
	dir: String,
	filename: String,
	size: String,
	type: String
});

var Music = mongoose.model('Music',Musicschema);

module.exports = Music;