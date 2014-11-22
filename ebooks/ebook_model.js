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
/* 
bookschema.pre('save', function(next) {
  var user = this;
  console.log("1");
 
  //query for duplicate data, drop if any
  mongoose.models['Books'].findOne({path : this.path}, 'path', function(err, results) {
        if(err) {
            next(err);
        } else if(results) {
            // console.warn('results', results);
            user.invalidate("path", "Path must be unique");
            next();
        } else {
            next();
        }
    });
});
*/

var Books = mongoose.model('Books',bookschema);
// Books.ensureIndexes();
module.exports = Books;