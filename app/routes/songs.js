'use strict';

var albums = global.nss.db.collection('albums');
var artists = global.nss.db.collection('artists');
var songs = global.nss.db.collection('songs');
var multiparty = require('multiparty');
var _ = require('lodash');
var fs = require('fs');
var mkdirp = require('mkdirp');

exports.index = (req, res)=>{
  songs.find().toArray((err, records)=>{
    artists.find().toArray((err, artistsRecords)=>{
      albums.find().toArray((err, albumsRecords)=>{
        records = records.map(album=>{
          var songAlbum = _(records).find(album=> album.albumID.toString() === album.albumID);
          album.albumID = songAlbum;
          return album;
        });
        records = records.map(artist=>{
          var songArtist = _(records).find(artist=> artist.artistID.toString() === artist.artistID);
          artist.artistID = songArtist;
          return artist;
        });
        res.render('songs/index', {songs: records, artists: artistsRecords, albums: albumsRecords, title: 'Songs'});
      });
    });
  });
};

exports.new = (req, res)=>{
  songs.find().toArray((err, records)=>{
    artists.find().toArray((err, artistsRecords)=>{
      albums.find().toArray((err, albumsRecords)=>{
        records = records.map(album=>{
          var songAlbum = _(records).find(album=> album.albumID.toString() === album.albumID);
          album.albumID = songAlbum;
          return album;
        });
        records = records.map(artist=>{
          var songArtist = _(records).find(artist=> artist.artistID.toString() === artist.artistID);
          artist.artistID = songArtist;
          return artist;
        });
        res.render('songs/new', {songs: records, artists: artistsRecords, albums: albumsRecords, title: 'New Song'});
      });
    });
  });
};

exports.create = (req, res)=>{
  var form = new multiparty.Form();

  form.parse(req, (err, fields, file)=>{
    var song = {};
    song.name = fields.name[0];
    song.genre = fields.genre[0];
    song.artistID = fields.artists[0];
    song.albumID = fields.albums[0];
    song.song = file.music[0].originalFilename;
    mkdirp(`${__dirname}/../static/audios/${song.name}`, function(err){
      fs.renameSync(file.music[0].path,`${__dirname}/../static/audios/${song.name}/${song.song}`);
    });
    songs.save(song, ()=>res.redirect('/songs'));
  });
};
