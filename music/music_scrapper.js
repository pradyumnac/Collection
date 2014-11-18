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
		if((stat.isFile(fp)) && (filetypelist.indexOf(path.extname(fp))>-1)) {
			//Only the file name iwthout nay extension
			ext = path.extname(fp);
			filename = path.basename(fp,ext)
			
			//related files logic
			//this helps in indexing opf , txt, info and jpg files corresponding to the book
			// 1st part of the logic - extracts just the filename without extension, and filters with the name tp find other files with same name
			// 2nd part of the logic - excludes the currenlyt iterated file from the filter this ensures that files withh different extensions are only taken
			related_fn  = filelist.filter(function(i){
				return ((i.indexOf(filename)>-1) && (i != path.basename(fp)));
			});
			// console.log(related_fn);
			
			collection.push({
				'path':fp,
				'dir':path.dirname(fp),
				'filename':filename,
				'size':stat.size,
				'type':path.extname(fp),
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