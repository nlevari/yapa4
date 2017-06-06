var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/build'));

// views is directory for all template files
app.set('views', __dirname + '/build');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('build/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});