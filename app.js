var express = require('express'),
    pg = require('pg'),
    conString = process.env.DATABASE_URL,
    client = new pg.Client(conString);

client.connect();

app = module.exports = express.createServer();

app.get('/', function(req, res) {
console.log(req.query)
  var query = req.query.MessageContent || 'book 1',
      book = query.split(/\s/)[0].toUpperCase(),
      page = parseInt(query.split(/\s/)[1], 10);
  console.log(query, book, page);
  res.header('Content-Type', 'text/plain');
  client.query("select pages.body from books join pages on pages.book_id = books.id where books.title = $1 and pages.page_number = $2", [book, page], function(err, queryResults) {
    if(queryResults && queryResults.rows && queryResults.rows.length) {
      res.end(queryResults.rows[0].body);
    } else {
      res.send(404)
      res.end('page not found');
    }
  });
});

app.listen(process.env.PORT || 1233);
console.log("Express server listening on port " + (app.address().port));
