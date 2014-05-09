'use strict';

exports.index = (req, res)=>{
  res.render('songs/index', {title: 'Songs'});
};

exports.new = (req, res)=>{
  res.render('songs/new', {title: 'New Songs'});
};
