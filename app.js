var express = require('express');
var app = express();

app.get('/', express.static(__dirname + '/public/index.html'));

app.use(express.static(__dirname + '/public'));

app.listen(8080, function () {
	console.log('Started');
});