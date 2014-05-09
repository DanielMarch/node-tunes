'use strict';

var multiparty = require('multiparty');
var artists = global.nss.db.collection('artists');

exports.index = (req, res)=>{
  res.render('artists/index', {title: 'Artists'});
};

exports.new = (req, res)=>{
  res.render('artists/new', {title: 'New Artist'});
};

exports.create = (req, res)=>{
  var form = new multiparty.Form();

  form.parse(req, (err, field, file)=>{
    var artist = {};
    artist.name = field.name[0];
    artist.photo = file.photo[0].originalFilename;
    artists.save(artist, ()=>res.redirect('/artists'));
  });
};
