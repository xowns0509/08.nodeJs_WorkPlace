/**
 * module-dir 폴더 안의 cal2.js
 */

function minus(x, y) {
	x = parseInt(x);
	y = parseInt(y);

	return x - y;
}

module.exports.minus = minus;
// sum이란 함수 호출. 그걸 module.exports.sum 이란 이름으로 만들어 줌.
// 이제 view.js에서 불러줄 거임.