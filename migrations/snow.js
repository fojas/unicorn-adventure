var fs = require('fs');
var pg = require('pg');
var express = require('express');

var inptext = '';
var bookName = 'SNOWWHITE';

inp = fs.createReadStream(__dirname + '/snow.txt');
inp.setEncoding('utf8');

inp.on('data', function (data) {
  inptext += data;
});

inp.on('end', function (close) {
  bookArray = inptext.match(/.{1,120}(?=(\s|$))/g);
  pg.connect(process.env.DATABASE_URL, function(err, client){
    client.query( "INSERT INTO books (title) values ('"+bookName+"')", function(){  
      client.query( "SELECT max(id) as book_id from books", function(err, result){
        var book_id = result.rows[0].book_id;
        var qs = "INSERT INTO pages(page_number, book_id, body) values ( $1, $2, $3)";
        for(var i = bookArray.length;i--;){
          client.query( qs, [i+1,book_id, bookArray[i].trim() + (i+1 == bookArray.length ? '' : (" - Reply " + bookName + ' ' + (i+2) + ' for next page'))]);
        }
      });
    });
  });
});

