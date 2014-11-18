/* Controller file for ebooks collection manager */

var mongoose = require('mongoose');
// var status = require('node-status')

mongoose.connect('mongodb://localhost:27017/ebooks');

var get_ebooks = require('./ebooks_scrapper');
var Ebook = require('./ebook_model');

function bulk_save_ebooks(bookobjlist) {
	Ebook.create(bookobjlist,function(err){
		if((err)&&(err.code==11000)) {console.log("This collection already exists, please use update db function")}
		else if(err) {console.log(err);}
		else {console.log("Success");}
		mongoose.connection.close()
	});	
}

function bulk_update_ebooks(bookobjlist) {
	Ebook.create(bookobjlist,function(err){
		if((err)&&(err.code==11000)) {console.log("This collection already exists, please use update db function")}
		else if(err) {console.log(err);}
		else {console.log("Success");}
		mongoose.connection.close()
	});	
}

function add_to_db(fp,filetypelist, recursive){
	files = get_ebooks.get(fp,filetypelist, recursive);
	
	bulk_save_ebooks(files);
 }
 
// var progress = status.addItem("Collecting Info", {
  // type: ['bar','percentage'],
  // max: 8,
  
// })

// status.start({
	// color:'Blue'
// }); 
add_to_db("E:\\downloads\\Ebooks",['.epub','.pdf','.mobi'],true);