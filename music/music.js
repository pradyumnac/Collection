/* Controller file for music collection manager */

var mongoose = require('mongoose');
// var status = require('node-status')

mongoose.connect('mongodb://localhost:27017/music');

var get_music = require('./music_scrapper');
var Esong = require('./music_model');

function bulk_save_music(songobjlist) {
	Esong.create(songobjlist,function(err){
		if((err)&&(err.code==11000)) {console.log("This collection already exists, please use update db function")}
		else if(err) {console.log(err);}
		else {console.log("Success");}
		mongoose.connection.close()
	});	
}

function bulk_update_music(songobjlist) {
	Esong.create(songobjlist,function(err){
		if((err)&&(err.code==11000)) {console.log("This collection already exists, please use update db function")}
		else if(err) {console.log(err);}
		else {console.log("Success");}
		mongoose.connection.close()
	});	
}

function add_to_db(fp,filetypelist, recursive){
	files = get_music.get(fp,filetypelist, recursive);
	
	bulk_save_music(files);
 }
 
// var progress = status.addItem("Collecting Info", {
  // type: ['bar','percentage'],
  // max: 8,
  
// })

// status.start({
	// color:'Blue'
// }); 
add_to_db("D:",['.mp3','.wav','.aac','m4a','amr'],true);