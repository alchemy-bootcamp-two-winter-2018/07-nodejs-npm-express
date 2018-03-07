'use strict';
// require your dependencies!
const express = require('express');
const app = express();
const bodyParser = express.urlencoded({extended: true}); // TODOne: remove me when PORT is used
const PORT = process.env.PORT || 3000; // TODOne: remove me when PORT is used

// TODOne: use express.static to server the public path!
app.use(express.static('public'));
// TODOne: server new.html under the alias GET /new
app.get('/new', (request, response) => {
  response.sendFile(`${__dirname}/public/new.html`);
});
// (HINT: use response.sendFile)

// TODOne: add a app.get for `/api/articles` that returns the
// `data/hackerIpsum.json`
app.get('/api/articles', (request, response) => {
  response.sendFile(`${__dirname}/data/hackerIpsum.json`);
});
// TODOne: server your articles data on GET /api/articles
app.post('/api/articles', bodyParser, (request, response) => {
  // REVIEW: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
  console.log(request.body);

  // for now just return the body...
  response.send(request.body);

  // STRETCH GOAL: read, change, and write the data file
});

app.use((request, response) => {
  response.statusCode = 404;
  response.send('OH NO PAGE DOESNT EXIST - 404');
});

app.listen(PORT, () => {
  console.log(`app up and running on port ${PORT}`);
});
