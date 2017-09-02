/**
 * initial-tasks.js // http://usejsdoc.org/
 */

exports.getTasks = function() {
	var tasks = {
		todo : [ '밥먹기', '커피마시기' ],
		inProcess : [ '쉬기' ],
		done : [ '잠자기' ]
	};// 배열 3개를 갖고있는 객체
	
	return tasks;
}