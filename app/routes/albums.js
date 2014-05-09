'use strict';

exports.index = (req, res)=>{
  res.render('albums/index', {title: 'Albums'});
};

exports.new = (req, res)=>{
  res.render('albums/new', {title: 'New Album'});
};
