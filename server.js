const express = require('express');
const parser = require('body-parser');
const server = express();
const MongoClient = require('mongodb').MongoClient;
server.use(parser.json());
server.use(parser.urlencoded({extended: true}));

MongoClient.connect('mongodb://localhost:27017', function(err, client){

  if(err) {
    console.log(err);
    return;
  }
  //add the name of the db
  const db = client.db("clients");
  console.log("Connect to database");

// ADD to DB this req ie body.req
  server.post('/api/clients', function(req, res){
    // req.body to db.quotes
    // if unsuccessful it will hit that err
    db.collection('clients').insert(req.body, function(err, result){
      if(err) {
        console.log(err);
        res.status(500);
        res.send();
        return;
      }
      console.log('saved to database');
      res.status(201);
      //result is an array of objects - result.ops[0] is the bit we want
      res.json(result.ops[0]);
    });
  });

// READ all quotes from DB
  server.get('/api/clients', function(req, res){
    console.log('hello');
    db.collection('clients').find().toArray(function(err, result){
      if(err) {
        console.log(err);
        res.status(500);
        res.send();
        return;
      }
      res.json(result);
    });
  });

// DELETE all quotes from DB
server.delete('/api/clients', function(req, res) {
 db.collection('clients').remove({}, function(err, result) {
    if(err) {
     console.log(err);
     res.status(500);
     res.send();
     return;
    }

    console.log("Deleted");
    res.status(204);
    res.send();
    // res.json(result);
   });
});

   server.listen(3000, function(){
     console.log("Listening on port 3000");
   })
});
