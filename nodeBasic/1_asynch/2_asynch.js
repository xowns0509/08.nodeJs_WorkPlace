/**
 * 2_asynchFile.js 노드js는 비동기가 기본임. 1_synchFile.js에서 변경.
 */

// 내장 모듈로 fs가 존재. FileSystem
var fs = require("fs");
console.log('준비중');

// 원래 기본은 readdir이야. 노드js가 지향하는.
// 근데 동기가 필요할 때가 있어 이 후에 readdirSync란 함수가 추가 된 거.

var filenames = fs.readdir('.', function(err, filenames) {
	// 현재 디렉토리에서 파일 읽는다는 함수
	// 또한, 이 function은 콜백함수 임. 파일을 읽을 때 마다 불러들임.

	// 하나씩 읽어들이는 부분을 이 안에다 기술
	for (var i = 0; i < filenames.length; i++) {
		console.log(filenames[i]);
	}
});
// 현재 디렉토리를 읽으라는 거.

// 호출을 해 놓고 걔가 완성되면 불려지는 거야.

console.log('진행완료');