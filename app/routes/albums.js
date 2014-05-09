'use strict';

var multiparty = require('multiparty');
var albums = global.nss.db.collection('albums');

exports.index = (req, res)=>{
  albums.find().toArray((err, records)=>{
    res.render('albums/index', {albums: records, title: 'albums'});
  });
};

exports.new = (req, res)=>{
  res.render('albums/new', {title: 'New album'});
};

exports.create = (req, res)=>{
  var form = new multiparty.Form();

  form.parse(req, (err, field, file)=>{
    var album = {};
    album.name = field.name[0];
    album.photo = file.photo[0].originalFilename;
    albums.save(album, ()=>res.redirect('/albums'));
  });
};
