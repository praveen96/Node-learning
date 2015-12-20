var express = require('express');
var app = express();
//var PORT = 8080;
var PORT = process.env.PORT || 3000;

//chrome hard refresh - ctrl+shift+r

var middleware = require('./middleware.js');
/*var middleware = {
	requireAuthentication: function (req, res, next) {
		console.log('private route hit!');
		next();
	},
	logger: function (req, res, next) {
		console.log('Request: ' + req.method + ' ' + req.originalUrl + (new Date().toString()));
		next();
	}
};
*/

//app.use(middleware.requireAuthentication);
app.use(middleware.logger);
//req -> request
//res -> response
/*app.get('/', function (req, res) {
	res.send('Hello express!');
});*/

/*app.get('/about', function (req, res) {
	res.send('About');
});*/

app.get('/about', middleware.requireAuthentication, function (req, res) {
	//requireAuthentication will run first before the body of the route!
	//so next() tells express to move on
	res.send('About');
});

app.use(express.static(__dirname + '/public'));
//console.log(__dirname);

app.listen(PORT, function () {
	console.log('Express server started on port ' + PORT);
});