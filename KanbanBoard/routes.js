/**
 * http://usejsdoc.org/
 */

var task = require('./controllers/task-controller.js');
// 

exports.route = function(app){
	app.get('/', task.list);//디폴트 경로가 들어오면 task.list
	
	//app.get('/createTask', task.create);//index.jade에서 form을 post방식으로 던졌으니 get이 아니라 post여야겠지
	app.post('/createTask', task.create);
	// tasks가 뭐냐면... 
	
	app.post('/updateTask', task.update);
	// index.jade의 updateTask와 같아야 함.
	
};