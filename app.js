var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.get('/', function (req, res) {
  res.render('homework3a')
})
app.get('/hw3', function (req, res){
  res.render('homework3b')
})
app.get('/hw2', function (req, res){
  res.render('homework2')
})
app.get('/hw1', function (req, res){
  res.render('homework1')
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})