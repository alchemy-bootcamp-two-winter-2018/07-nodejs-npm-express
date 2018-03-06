'use strict';
// require your dependencies!

const bodyParser = express.urlencoded({extended: true}); /* eslint-disable-line */ // TODO: remove me when PORT is used
const PORT = process.env.PORT || 3000; /* eslint-disable-line */ // TODO: remove me when PORT is used

// TODO: use express.static to server the public path!

// TODO: server new.html under the alias GET /new
// (HINT: use response.sendFile)

// TODO: add a app.get for `/api/articles` that returns the
// `data/hackerIpsum.json`

// TODO: server your articles data on GET /api/articles
app.post('/api/articles', bodyParser, (request, response) => {
  // REVIEW: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
  console.log(request.body);

  // for now just return the body...
  response.send(request.body);

  // STRETCH GOAL: read, change, and write the data file
});
