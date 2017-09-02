/**
 * http://usejsdoc.org/
 */

var mongoose = require("mongoose");// 몽고디비를 쓰기 위해 mongoose를 require.
mongoose.connect('mongodb://localhost/test');// text db사용하고 있었으니까.

var db = mongoose.connection;

db.on('error', console.error.bind(console, '연결실패:'));

// node.js는 기본적으로 비동기(non-blocking)방식이라
// 콜백함수 만들어줘야 함. 'open' 옆에 callback이란 이름의 함수.
// callback이란 이름은 없어도 됨.
db.once('open', function callback() {
	// 이제 여기다 mongodb와 연결에 관련된 놈들을 기술

	var sungjuk = mongoose.Schema({
		name : String,
		kor : Number,
		eng : Number
	});

	// sunguk스키마랑 연결하려 해. 클래스로 만듬.
	var Student = mongoose.model('Student', sungjuk);
	
	// Student 클래스로부터 s1
	var s1 = new Student({
		name : '김아무개',
		kor : 88,
		eng : 22
	});// 이라는 객체 생성

	s1.save(function(err, s1) {
		if (err) {
			throws
			err;
		}// 에러나오면 찍어. 콘솔에
		// 그렇지 않으면
		console.log('입력성공');

	});// 이것이 mongodb의 save함수를 호출
	// 노드 기본은 논블러킹이라... 또 콜백함수 만들어줘야겠지
	
	Student.find(function(err, ss){//내맘으로 만든 변수 ss
		if(err){throw err;}
		console.log('정보: ' + ss);
		db.close();
	});
	

});


// 컬렉션 이름을 주지 않았어
// 근데 students로 들어갔어
// 몽고db자체적으로 복수형으로 변환하여
// 진짜 영어의 복수형으로. human이라면 humen?