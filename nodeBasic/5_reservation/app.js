var socketio = require('socket.io');
var express = require('express');
var http = require('http');
var fs = require('fs');

// 좌석 상태:
// 0-좌석이 아닌 곳.
// 1- 예약이 가능한 좌석.
// 2-이미 예약한 좌석.
var seats = [ [ 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1 ],
		[ 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1 ],
		[ 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1 ],
		[ 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1 ],
		[ 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1 ],
		[ 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1 ],
		[ 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1 ],
		[ 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1 ],
		[ 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1 ],
		[ 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1 ],
		[ 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1 ],
		[ 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1 ],
		[ 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1 ] ];

// 웹서버생성
var app = express();

// 미들웨어(라우터) 설정
app.use(app.router);

// 라우터를 수행
app.get('/', function(request, response) {
	fs.readFile('HTMLPage.html', function(error, data) {
		response.send(data.toString());
	});
});

app.get('/seats', function(request, response) {
	response.send(seats);
});

// 웹서버 실행
var server = http.createServer(app);
server.listen(5100, function() {
	console.log('Server running...');
});

// 1. 웹소켓생성,실행
var io = socketio.listen(server);
io.sockets.on("connection", function(socket) {
	console.log("connection 소켓연결");
	// (3) 좌석 예약 요청을 받아 클라이언트에 전달.

	// 3-1 socket서버에 'reserve' 이벤트 설정
	socket.on('reserve', function(data) {
		// 클라이언트가 'reserve' 이벤트를 호출하면
		// 함께 전송된 좌석좌표(x, y)값을 예약완료상태(1 > 2)로 변경.
		seats[data.y][data.x] = 2;

		// 모든 클라이언트의 'reserver' 이벤트를 호출하여 예약 완료된 좌석정보를 전달한다.(=public 통신)
		io.sockets.emit('reserver', data);

	});
	
	socket.on('cancel', function(data) {
		// 클라이언트가 'reserve' 이벤트를 호출하면
		// 함께 전송된 좌석좌표(x, y)값을 예약완료상태(1 > 2)로 변경.
		seats[data.y][data.x] = 1;

		// 모든 클라이언트의 'reserver' 이벤트를 호출하여 예약 완료된 좌석정보를 전달한다.(=public 통신)
		io.sockets.emit('canceler', data);

	});
	
	

});