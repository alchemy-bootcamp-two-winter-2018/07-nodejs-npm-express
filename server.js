'use strict';

// TODOne require your dependencies!
const express = require('express');
const app = express();
const fs = require('fs');

const bodyParser = express.urlencoded({extended: true});
const PORT = process.env.PORT || 3000;

// TODOne: use express.static to server the public path!
app.use(express.static('public'));

// TODOne: server new.html under the alias GET /new
// (HINT: use response.sendFile)
app.get('/new', (request, response) => {
  response.sendFile(`${__dirname}/public/new.html`);
});

// TODOne: add a app.get for `/api/articles` that returns the
// `data/hackerIpsum.json`
app.get('/api/articles', (request, response) => {
  response.sendFile(`${__dirname}/data/hackerIpsum.json`);
});

app.post('/api/articles', bodyParser, (request, response) => {
  // REVIEW: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
  console.log(request.body);

  // for now just return the body...
  response.send(request.body);

  // STRETCH GOALed: read, change, and write the data file
  const file = 'data/hackerIpsum.json';
  const raw = fs.readFileSync(file);
  const articles = JSON.parse(raw);
  articles.push(request.body);
  fs.writeFileSync(file, JSON.stringify(articles, true, 2));
});

app.use((request, response) => {
  response.statusCode = 404;
  response.send(`This page doesn't exist.`);
});

app.listen(PORT, () => {
});