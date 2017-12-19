const express = require('express');
const parser = require('body-parser');
const app = express();
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.listen(3000, function(){
  console.log("Listening on port 3000");
})
