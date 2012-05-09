var pg = require('pg');
var express = require('express');

pg.connect(process.env.DATABASE_URL, function(err, client){
  client.query( "INSERT INTO books (title) values ('UNICORN')", function(){  
    client.query( "SELECT max(id) as book_id from books", function(err, result){
      var book_id = result.rows[0].book_id;
      var qs = "INSERT INTO pages(page_number, book_id, body) values ( $1, $2, $3)";
      //console.log(client.query( qs, [1,book_id, 'You have an encountered a unicorn. 5 to feed it. 7 to try to kill it.'], function(err, c){console.log(err);}));
      client.query( qs, [1,book_id, 'You have an encountered a unicorn. 5 to feed it. 7 to try to kill it.']);
      client.query( qs, [2,book_id,  "You stabbed the unicorn.  Now it is bleeding rainbows. 4 to give it a band-aid. 6 to keep stabbing."]);
      client.query( qs, [3,book_id,  "You trip and fall off a cliff.  You are dead."]);
      client.query( qs, [4,book_id,  "You fell for the unicorn's trick.  He stabs you with his horn.  You are dead."]);
      client.query( qs, [5,book_id,  "The unicorn does not like the food and wants to fight you. 2 to attack. 3 to run away"]);
      client.query( qs, [6,book_id,  "A herd of unicorns sneaks up behind you and stabs you.  You are dead."]);
      client.query( qs, [7,book_id,  "The unicorn senses danger wants to fight you. 2 to attack. 3 to run away"]);
      client.query( qs, [8,book_id,  "You become best friends with the unicorn and have a rainbow dance party."]);
    });
  });
})
