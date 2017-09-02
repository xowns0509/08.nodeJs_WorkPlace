/**
 * check.js
 */

var http = require('http'); //nodejs가 갖고 있는 내장 객체(모듈)
var server = http.createServer(function(req, res){
	res.writeHead(200, {'content-Type': 'text/plain;charset=UTF-8'});//한글 쓸 수 있게 charset=UTF-8를 추가함.
	res.end('나의 첫 노드');//
});

server.listen(1337, "127.0.0.1");// 기본포트는 1337

// http.createServer(function(req, res){
// res.writeHead(200, {'content-Type': 'text/plain;charset=UTF-8'});
// res.end('나의 첫 노드');//
// }).listen(1337, "127.0.0.1");
// 이것도 되. 압축한 거.

console.log('서버 실행: 1337포트 사용 중. 이거 확인하고  -> 브라우저 주소표시줄에  http://127.0.0.1:1337 주소쳐서 뜨는지 확인')//syso 같은 것.

// 내가 어떤 함수를 만들어 놓고. 만들어 놓기만 하고 딴 놈이 나를 부르는 거. 콜백함수