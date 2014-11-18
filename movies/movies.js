/* Controller file for movies collection manager */

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/movies');

var get_movies = require('./movies_scrapper');
var movie = require('./movies_model');

function bulk_save_movies(movieobjlist) {
	movie.create(movieobjlist,function(err){
		if((err)&&(err.code==11000)) {console.log("This document already exists, please use update db function",err)}
		else if(err) {console.log(err);}
		else {console.log("Success");}
		mongoose.connection.close()
	});	
	
}

function bulk_update_movies(movieobjlist) {
	movie.create(movieobjlist,function(err){
		if((err)&&(err.code==11000)) {console.log("This document already exists, please use update db function")}
		else if(err) {console.log(err);}
		else {console.log("Success");}
		mongoose.connection.close()
	});	
}

function add_to_db(fp,filetypelist, recursive){
	files = get_movies.get(fp,filetypelist, recursive);
	console.log("The following number of files were collected:");
	console.log(files.length);
	bulk_save_movies(files);
 }

add_to_db("E:\\downloads\\Videos",['.avi','.wmv','.mp4','.rmvb'],true);