var mongoose = require('mongoose');

var Musicchema = mongoose.Schema({
	path: {
		type: String,
		unique: 'True',
		index: 'True'
	},
	dir: String,
	filename: String,
	size: String,
	type: String
});

var Music = mongoose.model('Music',Musicchema);
// var Music = mongoose.model('Music');
// var a = new Music ({'path':'123'});
// console.log( a);

module.exports = Music;