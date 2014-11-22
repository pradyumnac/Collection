/**
 * GET /media
 * All media specific pages
 */
var mongoose = require('mongoose');
var Music = require('../models/music_model');
var Movies = require('../models/movies_model');
var Ebooks = require('../models/ebook_model');

 
 function getEbooks() {
    return Ebooks.find({},"path name");
}
function getMovies() {
    return Movies.find({},"path name");
}
function getMusic() {
    return Music.find({},"path name");
}
 
exports.index = function(req, res) {
  res.render('media/index', {
    title: 'Media'
  });
};

exports.music = function(req, res) {
  Music.find({},function(err,result){
       if(err) {
            console.log("Error in query");
       }
       else {
            res.render('media/music', {
            title: 'Music Gallery',
            mediadata: result
          });
    }
  });
};

exports.movies = function(req, res) {
  Movies.find({},function(err,result){
       if(err) {
            console.log("Error in query");
       }
       else {
            res.render('media/movies', {
            title: 'Movies Gallery',
            mediadata: result
          });
    }
  });
};

exports.ebooks = function(req, res) {
  Ebooks.find({},function(err,result){
       if(err) {
            console.log("Error in query");
       }
       else {
            res.render('media/ebooks', {
            title: 'Ebooks Gallery',
            mediadata: result,
            hello: 'World'
          });
    }
  });
};

exports.admin = function(req, res) {
  res.render('media/admin', {
    title: 'Admin Dashboard'
  });
};
