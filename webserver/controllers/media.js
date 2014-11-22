/**
 * GET /media
 * All media specific pages
 */

exports.index = function(req, res) {
  res.render('media/index', {
    title: 'Media'
  });
};

exports.music = function(req, res) {
  res.render('media/music', {
    title: 'Music Gallery'
  });
};

exports.movies = function(req, res) {
  res.render('media/movies', {
    title: 'Movies Gallery'
  });
};

exports.ebooks = function(req, res) {
  res.render('media/ebooks', {
    title: 'Ebooks Gallery'
  });
};

exports.admin = function(req, res) {
  res.render('media/admin', {
    title: 'Admin Dashboard'
  });
};
