'use strict';

var multiparty = require('multiparty');
var artists = global.nss.db.collection('artists');
var fs = require('fs');
var _ = require('lodash');
var mkdirp = require('mkdirp');
var Mongo = require('mongodb');

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
    mkdirp(`${__dirname}/../static/img/${artist.name}`, function(err) {
      fs.renameSync(file.photo[0].path,`${__dirname}/../static/img/${artist.name}/${artist.photo}`);
    });
    artists.save(artist, ()=>res.redirect('/artists'));
  });
};

exports.show = (req, res)=>{
  var _id = Mongo.ObjectID(req.params.id);
  var songs = global.nss.db.collection('songs');
  artists.find({_id:_id}).toArray((err, art)=>{
      songs.find().toArray((e, sngs)=>{
        var sl = _.filter(sngs, function(sng) { return sng.artistID.toString() === art[0]._id.toString(); });
      res.render('artists/show', {songs: sl, artists: art, title: 'Songs'});
    });
  });
};
