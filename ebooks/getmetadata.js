/* 
    Performs the following metadata parsing activities:
    * Clean name/filename
    * Associate book cover images   
        * Through local directory
    * get associated data through following web services:
        * Goodreads
        * Google books
        * Amazon Books API

 */

var mongoose = require('mongoose');
var fs = require('fs');
var db_url = 'mongodb://localhost:27017/Web';

mongoose.connect(db_url);

var get_ebooks = require('./ebooks_scrapper');
var Ebook = require('./ebook_model');

function bl(l) {
    // console.log(l);
    s = l.join('\r\n');
    fs.writeFileSync('debuglist.txt',s);
    
}

function cleanup_name_for_book_data(index, callback){
    function cleanup(s) {
        //cleans up name given its string
        var year_tag = /[\.|\[|\(][1-90]{4}[\.|\]|\)]/; //(3456) or .2012. or [3056]
        var edition = /(\[|\(){0,1}([1-9]*1st|[1-9]*2nd|[1-9]*3rd|[1-9]*[1-90]th[\s|.])(edition|ed)(\]|\)){0,1}/i; //'The Bike Book(48th edition)' //matches 11th, 21th as well as 21st
        var starting_number = /^[1-90]+\./; //'48. book of love'
        var filetypetag = /[\[|\(]pdf[\]|\)]|[\[|\(]epub[\]|\)]/i; // '[EPUB]' or '(pdf)'
        var sq_bracket_tags = /\[[\S]+\]/ //intentionally left out white spaces as these may contain descriptors
        
        //direct text tags are included below in list
        var tags = [year_tag,edition,starting_number,filetypetag, sq_bracket_tags,'VRG'];
        
        s = s.trim(); //trim b4
        for(i in tags) {
            s = s.replace(tags[i],'');
        }
        s = s.trim();//trim after 
        
        return s;
    }
    
    Ebook.find({name: {'$eq': null }},function(err,result){
        var booklist = [];
        if(err) {
            console.log(err);
       }
       else {
            for(j in result) {
                // console.log(result[j]);
                var name = result[j].filename; 
                name = cleanup(name);
                //console.log(name);
                Ebook.update({_id:result[j]._id},{name:name}, function(err, numAffected, rawresponse){
                        if(err){console.log(err);}
                        else {
                            //console.log(numAffected+" rows updated");
                        }
                    }
                );
                //booklist.push(result[j].filename+':::'+name);
            }
       }
       //mongoose.connection.close();
       //callback(booklist);
    });
}


function discover_related_files(index,callback) {
    
}

//test section
cleanup_name_for_book_data("5470ea210d4d1098151730e8",bl);
