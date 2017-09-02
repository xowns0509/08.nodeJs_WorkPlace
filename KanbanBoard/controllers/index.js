/**
 * controllers / indexjs.
 */

var initialTasks = require('./model/initial-tasks.js');

// index란 함수
exports.index = function(req, res) {
	res.render("index", {
		title : '나의 제목',
		todoTasks : initialTasks.getTasks().todo,
		progressTasks : initialTasks.getTasks().inProcess,
		doneTasks : initialTasks.getTasks().done
	})// 루트 폴더를 안쓰고 컨트롤 단에다 만드는 거. 결국 컨트롤러가 루트역할을 한다는거
	// 이제 app.js로
}