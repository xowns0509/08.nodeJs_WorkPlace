/**
 * http://usejsdoc.org/
 */

// 몽고DB연결
var mongoose = require("mongoose");
// 스키마 변수 잡기
var Schema = mongoose.Schema;
var taskSchema = new Schema({
	status : {
		type : String,
		'default' : 'TO-DO'
	},
	contents : String,
	createDate : {
		type : String,
		'default' : Date.now
	},// 오라클의 sysdate같은 역할
	author : {
		type : String,
		'default' : 'EOM'
	}
});

module.exports = mongoose.model("Task", taskSchema);