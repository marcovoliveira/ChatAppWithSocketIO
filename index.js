var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
const path = require('path')
var ejs = require('ejs');


app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
	res.render('index');
});

app.get('/two', function(req, res) {
	res.render('two');
});

app.get('/three', function(req, res) {
	res.render('three');
});


io.on('connection', function(socket) {
	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});
});

http.listen(process.env.PORT || 3000, function() {
	console.log('app running');
});
