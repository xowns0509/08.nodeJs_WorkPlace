/**
 * http://usejsdoc.org/
 */

var http = require('http');
var fs = require('fs');
// 여기까지기본형 외장모듈을 갖고 온거고
// 이제 npm install로 설치한 socket 갖고 오기.
var socketio = require('socket.io');
// 그냥 경로 안쓰고 파일명만 써도 되. node_modules안에 있거든.

// 서버가 불려졌을 때 실행 되는 놈.
var server = http.createServer(function(request, response) {
	fs.readFile("0_client.html", function(err, data) {// 웹서버 구동되면서
		// 0_client.html을 끌어다 줌.
		response.end(data);

	});// 0. 여기까지 웹서버 구동

	// 클라이언트가 접속했을 때 불려지는 놈. listen. 뭐가 불려져? 아래 console.log('서버 실행 중')이 담긴
	// function이.
}).listen(7500, function() {
	console.log('서버 실행 중');

});

// 1. 소켓연결
// server의 소켓도 클라이언트 요청을 기다려야 하잖아. 그래서 listen.
var io = socketio.listen(server);

// io.sockets: 소켓 여러 개가 연결될 수 있으므로 s붙음.
// connection이란 이름으로 연결하고 function(socket)으로 받아줌.
io.sockets.on("connection", function(socket) {
	console.log('소켓연결');

	// 클라이언트의 데이타 받기
	socket.on("toServer", function(data) {
		console.log("클라이언트로부터 " + data);

		// 클라이언트로 전송
		socket.emit("toClient", "서버로부터 다시 메세지를 전송: " + data);
	});
});