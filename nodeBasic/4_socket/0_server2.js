/**
 * http://usejsdoc.org/
 */

var http = require('http');
var fs = require('fs');
// 여기까지기본형 외장모듈을 갖고 온거고
// 이제 npm install로 설치한 socket 갖고 오기.
var socketio = require('socket.io');
// 그냥 경로 안쓰고 파일명만 써도 되. node_modules안에 있거든.

// 0.웹 서버 구동
var server = http.createServer(function(request, response) {
	fs.readFile("02_client.html", function(err, data) {// 웹서버 구동되면서
		// 0_client.html을 끌어다 줌.
		response.writeHead(200, {
			'Content-Type' : 'text/html'
		});
		response.end(data);

	});// 0. 여기까지 웹서버 구동

	// 클라이언트가 접속했을 때 불려지는 놈. listen. 뭐가 불려져? 아래 console.log('서버 실행 중')이 담긴
	// function이.
}).listen(7600, function() {
	console.log('서버 실행 중');

});

// 1. 소켓연결
// server의 소켓도 클라이언트 요청을 기다려야 하잖아. 그래서 listen.
var io = socketio.listen(server);

// io.sockets: 소켓 여러 개가 연결될 수 있으므로 s붙음.
// connection이란 이름으로 연결하고 function(socket)으로 받아줌.
io.sockets.on("connection", function(socket) {
	console.log('소켓연결');

	// 클라이언트 join 이벤트 받음
	socket.on("join", function(data) {
		socket.join(data);
	});

	// 클라이언트 message 이벤트를 받아서 다시 클라이언트에 message 이벤트를 보낸다.
	socket.on("message", function(data) {

		if (data.type === 'broadcast') {
			// 2. 나를 제외한 전송
			socket.broadcast.emit("message", data);

		} else if (data.type === 'normal') {
			// 1. 모든 클라이언트한테 전송
			io.sockets.emit("message", data);
		}

	});

	// 3. 귓속말 기능.

});

// 이벤트 드리븐 방식

// 1. 모든 클라이언트한테 전송
// io.sockets.emit("message", data);

// 2. 나를 제외한 전송
// socket.broadcast.emit("br_message", data)

// 3. 귓속말 기능.

// console.log("클라이언트로부터 name " + data.name);
// console.log("클라이언트로부터 message " + data.message);
// console.log("클라이언트로부터 data " + data.date);
//
// // 클라이언트로 전송
// socket.emit("message", function() {
// console.log("클라이언트에게 name " + data.name);
// console.log("클라이언트에게 message " + data.message);
// console.log("클라이언트에게 data " + data.date);
// });