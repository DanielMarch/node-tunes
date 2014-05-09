'use strict';

var multiparty = require('multiparty');
var artists = global.nss.db.collection('artists');
var fs = require('fs');
var mkdirp = require('mkdirp');

exports.index = (req, res)=>{
  artists.find().toArray((err, records)=>{
    res.render('artists/index', {artists: records, title: 'Artists'});
  });
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
    console.log(file);

    mkdirp(`${__dirname}/../static/img/${artist.name}`, function(err) {
      fs.renameSync(file.photo[0].path,`${__dirname}/../static/img/${artist.name}/${artist.photo}`);
    });
    artists.save(artist, ()=>res.redirect('/artists'));
  });
};
