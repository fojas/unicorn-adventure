pg = require('pg');
express = require('express');

pg.connect(process.env.DATABASE_URL, function(err, client){
  client.query( "CREATE SEQUENCE book_id_seq;" )
  client.query( "CREATE SEQUENCE page_id_seq;")
  client.query( "CREATE TABLE books(id INTEGER DEFAULT NEXTVAL('book_id_seq'), title VARCHAR(255), PRIMARY KEY(id));")
  client.query( "CREATE TABLE pages(id INTEGER DEFAULT NEXTVAL('page_id_seq'), page_number INTEGER NOT NULL, book_id INTEGER NOT NULL, body VARCHAR(160), PRIMARY KEY(id), FOREIGN KEY(book_id) REFERENCES books(id));")
})
