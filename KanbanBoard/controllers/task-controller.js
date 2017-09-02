/**
 * controllers/ http://usejsdoc.org/
 */

var Task = require('../model/tasks');//

// list 인 경우
exports.list = function(req, res) {// http니까 req, res 받고
	Task.find(function(err, tasks) {
		// console.log('리스트 작업 성공' + tasks);

		var todoTasks = [];
		var progressTasks = [];
		var doneTasks = [];

		for ( var key in tasks) {
			var task = tasks[key];
			if (task.get('status') == 'TO-DO') {
				todoTasks.push(task.get('contents'));

			} else if (task.get('status') == 'PROGRESS') {
				progressTasks.push(task.get('contents'));

			} else if (task.get('status') == 'DONE') {
				doneTasks.push(task.get('contents'));
			} else {
				console.log("작업 상태값이 없습니다.");
			}
		}

		// 응답보내기
		res.render('index', {
			title : '나의 제목',
			todoTasks : todoTasks,
			progressTasks : progressTasks,
			doneTasks : doneTasks
		});

	});

};

// create 인 경우
exports.create = function(req, res) {
	Task.find({
		content : req.body.contents
	// index.jade에서... 텍스트 필드를 찾는 거임. 그래서 db안에 있으면 function(err, tasks)...작동.
	}, function(err, tasks) {
		if (err) {
			throw err;
		}
		new Task({
			contents : req.body.contents,
			body : req.body.author
		}).save();

	});
	res.redirect('/');
	res.end();
};

// 작업 변경
exports.update = function(req, res) {
	Task.update({
		contents : req.body.contents
	}, {
		status : req.body.status
	// 상태값을 "PROGRESS" 로 변경
	}, function(err) {
		if (err) {
			throw err;
		}
		console.log('작업을 변경했어');
	});// update는 2개가 필요하지. 조건과 값으로

	res.redirect('/'); // '/'는 다시 리스트 보여주는거.
	res.end();

};