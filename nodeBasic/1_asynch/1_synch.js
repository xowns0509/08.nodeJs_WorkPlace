/**
 * 1_synchFile.js
 */

// 내장 모듈로 fs가 존재. FileSystem
var fs = require("fs");
var filenames = fs.readdirSync('.');// 현재 디렉토리를 읽으라는 거.
// 현재 디렉토리에서 파일 읽는다는 거

console.log('준비중');
for (var i = 0; i < filenames.length; i++) {
	console.log(filenames[i]);
}
console.log('진행완료');