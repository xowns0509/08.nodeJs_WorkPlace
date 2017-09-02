/**
 * http://usejsdoc.org/
 */

var func = require('./cal'); // 어짜피 불러들일 건 모두 .js니까 굳이 .js를 쓰지 않았어
console.log("합: " + func.sum(3, 4));
// cal.js까지 한게 func였고 그 안에 있는 sum을 호출해야 하므로 func.sum

// 다른 디렉토리에서 불러들임
var dir_func = require('./module-dir/cal2');
console.log("차: " + dir_func.minus(3, 4));

//노드 js는 node_modules폴더를 자동으로 인식해 줌.
//따라서 경로 따로 안 쓰고 파일명만 써줘도 됨.
// 단, 폴더이름이 무조건 node_modules이어야 함. 대소문자 가림.
var module_func = require('cal3');
console.log("곱: " + module_func.minus(3, 4));
