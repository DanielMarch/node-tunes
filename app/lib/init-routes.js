'use strict';

var traceur = require('traceur');
var dbg = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var albums = traceur.require(__dirname + '/../routes/albums.js');
  var artists = traceur.require(__dirname + '/../routes/artists.js');
  var songs = traceur.require(__dirname + '/../routes/songs.js');

  app.get('/', dbg, home.index);

  app.get('/albums', dbg, albums.index);
  app.get('/albums/new', dbg, albums.new);
  app.post('/albums', dbg, albums.create);

  app.get('/artists', dbg, artists.index);
  app.get('/artists/new', dbg, artists.new);
  app.post('/artists', dbg, artists.create);

  app.get('/songs', dbg, songs.index);
  app.get('/songs/new', dbg, songs.new);
  app.get('/songs/sort/name', dbg, songs.namesort);
  app.get('/songs/sort/genre', dbg, songs.genresort);
  app.get('/songs/sort/artistId', dbg, songs.artistsort);
  app.get('/songs/sort/albumId', dbg, songs.albumsort);
  app.post('/songs', dbg, songs.create);

  app.get('/albums/:id', dbg, albums.show);
  app.get('/artists/:id', dbg, artists.show);

  console.log('Routes Loaded');
  fn();
}
