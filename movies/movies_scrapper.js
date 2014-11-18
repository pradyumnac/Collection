var fs = require('fs');
var path = require('path');

function getFolder(dir,filetypelist, recursive) { 
	if((typeof dir != 'string') || (typeof filetypelist != 'object') || (typeof recursive != 'boolean')){
		throw("incorrect arguments");
	}
	
	var collection = [];
	
	var filelist = fs.readdirSync(dir);
	// console.log(filelist);
	// var m = filelist.length;
	
	
	filelist.forEach(function(node){		
		fp = path.join(dir,node);
		try {
			stat = fs.statSync(fp);
		}
		catch(err) {
			// console.log('Error getting file stats');
			console.log(err);
			return; //ignore error for thsi isnstance and continue
		}
		
		if(recursive && stat.isDirectory()){
			sub = getFolder(fp, filetypelist, recursive);
			sub.forEach(function(file) {
				collection.push(file);
			});
		}
		// console.log(filetypelist);
		else if((stat.isFile(fp)) && (filetypelist.indexOf(path.extname(fp))>-1)) {
			//Only the file name iwthout nay extension
			ext = path.extname(fp);
			filename = path.basename(fp,ext);
			dirname = path.dirname(fp);
			
			dirfilelist = fs.readdirSync(dirname);
			//related files logic
			//this helps in indexing opf , txt, info and jpg files corresponding to the book
			// 1st part of the logic - only files in same folder
			// 2nd part of the logic - excludes the currenlyt iterated file from the filter this ensures that files withh different extensions are only taken
			related_fn  = dirfilelist.filter(function(i){
				return ((stat.isFile(i)) && (i != path.basename(fp)));
			});
			// ### in case of movies, the file name need not be the same as other related files in folder ###
			// console.log(related_fn);
			
			collection.push({
				'path':fp,
				'dir':dirname,
				'filename':filename,
				'size':stat.size,
				'type':ext,
				'related':related_fn
			});
		}	
	});
	
	return(collection);
}

// files = getFolder("E:\\downloads\\Ebooks\\Sci Fi collection\\775 Ebooks",['.epub'],true)
// console.log(files);

module.exports = {
	'get':getFolder
};