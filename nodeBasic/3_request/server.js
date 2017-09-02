/**
 * http://usejsdoc.org/
 */

// nodejs의 내장모듈은 몇 개?(http, fs, proces, url....)
// 이러한 내장모듈을 가따 쓰고 싶으면 require("내장모듈명");
var http = require("http");// 그니까 이건 http란 모듈을 사용한다는 거지.

var server = http.createServer(function(req, res) {
	if (req.url == '/') {
		res.writeHead(200, {
			'Content-Type' : 'text/plain;charset=UTF-8'
		});
		res.write('메인페이지라 가정합시다');
		res.end();

	} else if (req.url == '/add') {
		res.writeHead(200, {
			'Content-Type' : 'text/plain;charset=UTF-8'
		});
		res.write('더하기역할 페이지.');
		res.end();
	}

});

server.listen(8000, 'localhost');// 포트번호와 ip.
console.log('8000포트 서버실행 확인용.');
// 브라우저에서 http://127.0.0.1:8000/ 혹은 http://localhost:8000/쳐서 확인.

// else if (req.url == '/add') 이후의 내용을 추가 한 후
// 브라우저에서 http://127.0.0.1:8000/add 혹은 http://localhost:8000/add 하면 '더하기역할
// 페이지.'라고 나옴.
// 원래 파일명이 들어가야 하는 데 이런식으로 불러주기 가능.
// web에서 이런 놈들을 RESTful

// 내가 웹에서 채팅을 만들고자 해.
// 하지만 http로 채팅은 못만들어.
// 노드가 나오면서부터 웹에서 채팅이 가능.
