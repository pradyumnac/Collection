/* 
    Performs the following metadata parsing activities:
    * Clean name/filename
    * Associate movie cover images   
        * Through local directory
    * Associate movie subtitle file   
        * Through local directory
    * get associated data through following web services:
        * IMDB
        * TVDB
        * Rottentomatoes

 */

var mongoose = require('mongoose');
var fs = require('fs');
var db_url = 'mongodb://localhost:27017/Web';

mongoose.connect(db_url);

var get_movies = require('./movies_scrapper');
var Movies = require('./movies_model');

function bl(l) {
    // console.log(l);
    s = l.join('\r\n');
    fs.writeFileSync('debuglist.txt',s);
    
}

function cleanup_name_for_movie_data(index, callback){
    function cleanup(s) {
        
        s = s.trim(); //trim b4
        
        var movie_tags = /(\.|\-|\_|\s|\[|\(|\{|^)(HDTV|XVID|BluRay|Blu\sRay|1080p|720p|480p|x264|mhd|Dual\sAudio|Sample|MSubs|AC3|HDRip|BRRIP|TVRIP|AAC|ETRG|juggs|FEVER|LOL|ASAP|YIFY|www\.mvgroup\.org|HC|tomcat12)(\.|\-|\_|\s|\]|\)|\}|$)/gi;
        var tg = s.match(movie_tags);
        console.log(tg);
        do {
            s = s.replace(movie_tags,'.');
        } while(s.match(movie_tags));
        
        //cleans up name given its string
        var year_tag = /[\.|\[|\(][1-90]{4}[\.|\]|\)]/; //(3456) or .2012. or [3056]
        // var starting_number = /^[1-90]+\./; //'48. book of love'
        var filetypetag = /[\[|\(]pdf[\]|\)]|[\[|\(]epub[\]|\)]/i; // '[EPUB]' or '(pdf)'
        var sq_bracket_tags = /\[[\S]+\]/ //intentionally left out white spaces as these may contain descriptors
        
        //direct text tags are included below in list
        var tags = [year_tag,filetypetag, sq_bracket_tags,'VRG'];
                
        for(i in tags) {
            s = s.replace(tags[i],'.');
        }
        s = s.trim();//trim after 
               
        //cleanup multiple consecutive symbols
        s = s.replace(/[\#|\.|\-|\_|\s]{2,}/gi,'.');
        //cleanup trailing symbols
        s = s.replace(/[\s|\.]+$/g,'');//trim after 
        
        return {s:s,tags:tg};
    }
    
    Movies.find({name: {'$eq': null }},function(err,result){
        var movielist = [];
        if(err) {
            console.log(err);
       }
       else {
            for(j in result) {
                // console.log(result[j]);
                var name = result[j].filename; 
                obj = cleanup(name);
                name = obj.s;
                tags = obj.tags
                // console.log(name);
                // Movies.update({_id:result[j]._id},{name:name,tags:tags}, function(err, numAffected, rawresponse){
                        // if(err){console.log(err);}
                        // else {
                            // console.log(numAffected+" rows updated");
                        // }
                    // }
                // );
                
                //result[j].filename+':::'+
                movielist.push(name);
            }
       }
       mongoose.connection.close();
       callback(movielist);
    });
}


function discover_related_files(index,callback) {
    
}

//test section
cleanup_name_for_movie_data("5470ea210d4d1098151730e8",bl);
