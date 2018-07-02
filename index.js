const express = require('express')
const path = require('path')
const PORT = process.env.PORT
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.get('/', (req, res) => res.render('index'))

	.listen(PORT, () => console.log(`Listening on ${ PORT }`))


app.get('/two', function(req, res) {

	res.render('two')
})

app.get('/three', function(req, res) {

	res.render('three')
})

io.on('connection', function(socket) {
	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});
});

http.listen(3000, function() {
	console.log('listening on *:3000');
});
