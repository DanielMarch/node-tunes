'use strict';

var albums = global.nss.db.collection('albums');
var artists = global.nss.db.collection('artists');
var songs = global.nss.db.collection('songs');
var multiparty = require('multiparty');
var _ = require('lodash');
var fs = require('fs');
var mkdirp = require('mkdirp');

exports.index = (req, res)=>{
  songs.find().toArray((err, songs)=>{
    artists.find().toArray((err, artistsRecords)=>{
      albums.find().toArray((err, albumsRecords)=>{
        var songsRecords = songs.map(song=>{
          var artist = _(artistsRecords).find(artist => artist._id.toString() === song.artistID);
          song.artist = artist;
          var album = _(albumsRecords).find(album=> album._id.toString() === song.albumID);
          song.album = album;
          return song;
       });
        res.render('songs/index', {songs: songsRecords, artists: artistsRecords, albums: albumsRecords, title: 'Song List'});
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

exports.namesort = (req, res)=>{
  songs.find({}, {sort:[['name', -1]]}).toArray((e, s)=>{
    albums.find().toArray((e, alb)=>{
      artists.find().toArray((e, art)=>{
        s = s.map(song => {
          console.log('*********************************');
          console.log(s);
          console.log(song);
          return song;
        });
        res.render('songs/index', {albums: alb, artists: art, songs: s, title: 'Song List'});
      });
    });
  });
};

exports.genresort = (req, res)=>{
  songs.find({}, {sort:[['genre', -1]]}).toArray((e, s)=>{
    albums.find().toArray((e, alb)=>{
      artists.find().toArray((e, art)=>{
        s = s.map(song => {
          console.log('*********************************');
          console.log(s);
          console.log(song);
        });
      });
    });
  });
};

exports.artistsort = (req, res)=>{
  songs.find({}, {sort:[['artistID', -1]]}).toArray((e, s)=>{
    albums.find().toArray((e, alb)=>{
      artists.find().toArray((e, art)=>{
        s = s.map(song => {
          console.log('*********************************');
          console.log(s);
          console.log(song);
        });
      });
    });
  });
};

exports.albumsort = (req, res)=>{
  songs.find({}, {sort:[['albumID', -1]]}).toArray((e, s)=>{
    albums.find().toArray((e, alb)=>{
      artists.find().toArray((e, art)=>{
        s = s.map(song => {
          console.log('*********************************');
          console.log(s);
          console.log('*********************************');
          console.log(song);
        });
      });
    });
  });
};
