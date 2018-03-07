'use strict';
// require your dependencies!

const express = require('express');
const body = require('body-parser');
const fs = require('fs');

const app = express();

const bodyParser = express.urlencoded({extended: true}); 
const PORT = process.env.PORT || 3000;

// TODONE: use express.static to server the public path!
app.use(express.static('public'));
// TODONE: server new.html under the alias GET /new
// (HINT: use response.sendFile)
app.get('/new', (request, response) => {
  response.sendFile(`${__dirname}/public/new.html`);
})
// TODONE: add a app.get for `/api/articles` that returns the
// `data/hackerIpsum.json`
app.get('/api/articles', (request, response) => {
  response.sendFile(`${__dirname}/data/hackerIpsum.json`);
})
// TODONE: server your articles data on GET /api/articles
app.post('/api/articles', bodyParser, (request, response) => {
  const file = `${__dirname}/data/hackerIpsum.json`;
  const raw = fs.readFileSync(file);
  const article = JSON.parse(raw);
  article.push(request.body);
  fs.writeFileSync(file, JSON.stringify(article, true, 2));
  // REVIEW: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
  console.log(request.body);

  response.send(request.body);
});

app.use((request, response) => {
  response.statusCode = 404;
  response.send(`Oh FUCK! Page ${request.url} doesn't exist.`);
});

app.listen(3000, () => {
  console.log('3000');
});