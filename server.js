//Core Node.js
var path = require('path');

//External Dependencies
var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var tldjs = require('tldjs');

// Vars
var Orgs = require('./helpers/models').Orgs;
var auth = require('./helpers/auth');
var app = express();
var port = process.env.PORT || 3500;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(compression());
//app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/dist'), {
	maxAge: 86400000
}));

//app.use('*', auth.checkToken);

app.get('/login', (req, res) => {
	var host = req.get('host');
	var parsed = tldjs.parse(host);

	// console.log("parsed: ", parsed);
	// Orgs.getItem({

	// })
	return res.render('index', {
		org: null
	});
});

app.all('*', function(req, res) {
	return res.render('index', {
		org: null
	});
});

app.listen(port);

console.log('listening on port: %d', port);
