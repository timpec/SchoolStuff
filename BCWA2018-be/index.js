'use strict';

require('dotenv').config();
const express = require('express');
const db = require('./modules/database');
const resize = require('./modules/resize');
const exif = require('./modules/exif');

const multer = require('multer');
const upload = multer({dest: 'public/uploads/'});

const app = express();

const connection = db.connect();

const cb = (result, res) => {
  console.log(result);
  res.send(result);
};

app.use(express.static('public'));

app.post('/delete', (req, res, next) =>{
  console.log('delete1.0');
});

app.get('/delete', (req, res, next) => {
  console.log('deleting...');
  var data = {
    id: req.query.idM,
  };
  db.deleteData(data, connection, next);
  res.redirect('/');
});

app.post('/update', (req, res, next) =>{
  console.log('update 1');
  next();
});

app.get('/update', (req, res, next) => {
console.log("update 2");
  var data = {
    cat: req.query.category,
    tit: req.query.title,
    det: req.query.details,
    id: req.query.idM,
  };
  db.update(data, connection, next);
  res.redirect('/');
});


app.post('/search', (req, res, next) =>{
  console.log('search1');
  next();
});

app.get('/search', (req, res, next) => {
  console.log('searching...');
  console.log(req.query.category);
  var data = {
    cat: req.query.category,
    };
  db.search(data, connection, next);
  res.redirect('/');
});


// respond to post and save file
app.post('/upload', upload.single('mediafile'), (req, res, next) => {
  next();
});

// create thumbnail
app.use('/upload', (req, res, next) => {
  resize.doResize(req.file.path, 300,
      './public/thumbs/' + req.file.filename + '_thumb', next);
});

// create medium image
app.use('/upload', (req, res, next) => {
  resize.doResize(req.file.path, 640,
      './public/medium/' + req.file.filename + '_medium', next);
});

// get coordinates
app.use('/upload', (req, res, next) => {
  exif.getCoordinates(req.file.path).then(coords => {
    req.coordinates = coords;
    next();
  }).catch(() => {
    console.log('No coordinates');
    req.coordinates = {};
    next();
  });
});

// insert to database
app.use('/upload', (req, res, next) => {
  console.log('insert is here');
  const data = [
    req.body.category,
    req.body.title,
    req.body.details,
    req.file.filename + '_thumb',
    req.file.filename + '_medium',
    req.file.filename,
    req.coordinates,
  ];
  db.insert(data, connection, next);
});

// get updated data form database and send to client
app.use('/upload', (req, res) => {
  db.select(connection, cb, res);
});

app.use('/search', (req, res) =>{
  db.select(connection, cb, res);
});

app.use('/update', (req, res) =>{
  db.select(connection, cb, res);
});

app.use('/delete', (req, res) =>{
  db.select(connection, cb, res);
});

app.get('/images', (req, res) => {
  db.select(connection, cb, res);
});


app.listen(3000);
/*
http.createServer((req, res) => {
  res.writeHead(301, { 'Location': 'https://' + req.headers.host + '/node' + req.url });
  res.end()
}).listen(8080);
https.createServer(options, app).listen(3000);
*/