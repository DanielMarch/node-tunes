'use strict';

exports.index = (req, res)=>{
  res.render('artists/index', {title: 'Artists'});
};

exports.new = (req, res)=>{
  res.render('artists/new', {title: 'New Artist'});
};
