'use strict';

var multiparty = require('multiparty');
var albums = global.nss.db.collection('albums');
var fs = require('fs');
var _ = require('lodash');
var mkdirp = require('mkdirp');
var Mongo = require('mongodb');

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
    mkdirp(`${__dirname}/../static/img/${album.name}`, function(err) {
      fs.renameSync(file.photo[0].path,`${__dirname}/../static/img/${album.name}/${album.photo}`);
    });
    albums.save(album, ()=>res.redirect('/albums'));
  });
};

exports.show = (req, res)=>{
  var _id = Mongo.ObjectID(req.params.id);
  var songs = global.nss.db.collection('songs');
  albums.find({_id:_id}).toArray((err, alb)=>{
      songs.find().toArray((e, sngs)=>{
        var sl = _.filter(sngs, function(sng) { return sng.albumID.toString() === alb[0]._id.toString(); });
      res.render('albums/show', {songs: sl, albums: alb, title: 'Songs'});
    });
  });
};
