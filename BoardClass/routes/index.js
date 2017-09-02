var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 1. ###########################
router.get('/write', function(req, res, next) {
  res.render('writeform', { title: '글쓰기' });
});

//2. #######################
var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit : 100,
	host : '127.0.0.1',
	user : 'root',
	password : '1234',
	database : 'test'
});

// 3. ###########################
router.post('/write', function(req, res, next) {
  // [1]
  // console.log( req.body );
  // 콘솔에서는 확인 가능하나 브라우저에서는 응답을 계속 기다림

	// [2] 이전 폼의 값을 넘겨받음
  var writer = req.body.writer;
  var pwd = req.body.pwd;
  var title = req.body.title;
  var content = req.body.content;

  // [3] DB 처리
  // npmjs.org > mysql 검색 > install 확인 pooling connecionts 부분임
  pool.getConnection(function(err, conn){
  	if(err) console.error('err = ' , err);
  	// console.log('연결 성공');
  	// res.send('저장 성공 ');
  	// 실제 저장된 것은 아니지만 요청/응답 확인

  	var sql = "insert into board(writer, title, content, pwd, hit, regdate) values(?,?,?,?,0,now())";
  	var arr = [writer, title, content, pwd];
  	conn.query(sql, arr, function(err, row ){
  		if(err) console.error('err ' , err);
  		//console.log('row', row);
  		// 출력결과에서 affectedRows :1 인 경우 하나가 입력됨
  		if(row.affectedRows == 1) {
  			res.send('저장 성공 2');
  			//res.redirect('/list');
  		}	else {
  			res.send('저장실 패 ');
  		}
  	});
  	conn.release();
  });
});


// 4. 목록보기 ###########################
router.get('/list', function(req, res, next) {
  pool.getConnection(function(err, conn){
  	if(err) console.error('err = ' , err);

  	//var sql = "select num,writer, title, content, pwd, hit, regdate from board order by num desc";
  	// 날짜 형식
  	var sql = "select num,writer, title, content, pwd, hit, date_format(regdate,'%Y %c/%e') regdate from board order by num desc";

  	conn.query(sql, [], function(err, rows ){
  		if(err) console.error('err ' , err);
  		console.log('row', rows); // 콘솔확인
  		//res.send('성공'); // 응답이 없으면 기대상태로 빠짐
	 		// 한번만 res.send() 해야 한다

	 		// 4-1
	 		// res.render('list', { title : '글목록 '});

  		// 4-2
  	
  		var datas = {
  			'title' : '글목록',
  			'rows' : rows
  		};


  		res.render('list', datas);
  		// 4-3
  		//res.json({rows:rows});
  		// 위의 render 대신 json으로 데이타 보내면 모바일 용으로 데이타 전송이라 할 수 있다.


  	});
  	conn.release();
  });
});

// 10. 페이징
//router.get('/list', function(req, res, next) {
//	res.redirect('list/1');
//});
//
//// 10. 페이징 ###########################
//router.get('/list/:page', function(req, res, next) {
//	var page = req.params.page;
//
//
//	// 한 페이지당 3개의 레코드가 출력된다면
//	var intpage = parseInt( page ); // 문자열로 넘어오기에 숫자로 형변환
//
//	var size = 3;
//	var begin = ( page - 1 ) * size;	// 시작글번호
//
//	console.log('page0=', page);
//	console.log('page1=', intpage);
//	console.log('begin0=', begin);
//
//  pool.getConnection(function(err, conn){
//  	if(err) console.error('err = ' , err);
//
//  	// 전체 글의수를 얻기
//  	var sqlCount = "select count(*) cnt from board";
//  	conn.query( sqlCount, [], function(err, rows){
//  		if(err) return next(err);
//  		var cnt = rows[0].cnt;
//  		console.log('cnt=', cnt);
//  		var totalPage = Math.ceil( cnt / size); // 전체페이지수
//  		var pageSize = 2; // [이전]과 [다음] 사이의 페이지 번호 링크 크기
//  		var startPage = (Math.ceil( page/pageSize) - 1) * pageSize + 1;
//  		var endPage = startPage + ( pageSize - 1);
//  		if( endPage > totalPage ){
//  			endPage = totalPage;
//  		}
//
//  		// 가상글번호
//  		var max = cnt - ( (page-1)*pageSize);
//
//  		// 필요한 목록 검색
//  		var sql = "select num,writer, title, content, pwd, hit, date_format(regdate,'%Y %c/%e') regdate from board order by num desc limit ?,?";
//  		console.log('begin=', begin);
//  		console.log('size=', size);
//  		conn.query(sql, [begin, size ], function(err, rows ){
//  			if(err) console.error('err ' , err);
//  			console.log('row', rows); // 콘솔확인
//
//  			var datas = {
//  				'title' : '글목록',
//  				'rows' : rows,
//  				'page' : page,
//  				'pageSize':pageSize,
//  				'startPage' : startPage,
//  				'endPage' : endPage,
//  				'totalPage': totalPage,
//  				'max' : max
//  			};
//  			res.render('list', datas);
//  		});
//  	});
//
//
//  	conn.release();
//  });
//});

//5. 상세보기
// 넘오는 값이 2개 이상이라면 '/read/:num/:name'
router.get('/read/:num', function(req, res, next) {
	var num = req.params.num; // express api에서 확인
	// 확인 console.log('num', num);

  pool.getConnection(function(err, conn){
  	if(err) console.error('err = ' , err);

  	// 5-1 저회수 증가
  	var sqlUpdate = "UPDATE board SET hit=hit+1 WHERE num=?";
  	conn.query( sqlUpdate, num, function(err, row){
  		if(err) console.error('err ' , err);
  	// update를 하고 select를 해야 하기에 코드를 나란히 작성하면 안되고, select 구문이 update 안에 있어야 한다.
  		var sql = "select num,writer, title, content, pwd, hit, date_format(regdate,'%Y %c/%e') regdate from board where num=?";

  		  	conn.query(sql, num, function(err, rows ){
  		  		if(err) console.error('err ' , err);
  		  		console.log('rows', rows); // 콘솔확인
  		  		// 하나가 넘어와도 배열로 처리된다

  		  		var datas = {
  		  			'title' : '글상세보기 ',
  		  			'row' : rows[0]
  		  			// 배열로 넘어오기에 rows[0]로 처리해야된다
  		  		};

  		  		res.render('read', datas);

  		  	}); // select
  	}); // update

  	conn.release();
  });
});

//6. 수정폼
router.get('/update/:num', function(req, res, next) {
	var num = req.params.num; // express api에서 확인
	// 확인
	//res.send('update : ' +  num);
	pool.getConnection(function(err, conn){
		if(err) console.error('err = ' , err);
		var sql = "select num, writer, title, content, pwd, hit, date_format(regdate,'%Y %c/%e') regdate from board where num=?";
		conn.query( sql, num, function(err, rows){
			if(err) console.error('err ' , err);
			console.log('rows', rows);
			var datas = {
				'title':'글수정',
				'row':rows[0]
			};
			res.render('updateform', datas);
			});
		conn.release();
	});
});

// 7. 수정
router.post('/update', function(req, res, next) {
 	var num = req.body.num;
  var writer = req.body.writer;
  var pwd = req.body.pwd;
  var title = req.body.title;
  var content = req.body.content;

  pool.getConnection(function(err, conn){
  	if(err) console.error('err = ' , err);

  	var sql = "update board set writer=?, title=?, content=? where num=? and pwd=?";
  	var arr = [writer, title, content, num, pwd];
  	conn.query(sql, arr, function(err, row ){
  		if(err) console.error('err ' , err);

  		if(row.affectedRows == 1) {
  			//res.send('저장 성공 2');
  			res.redirect('/read/'+num);
  		}	else {
  			res.send('수 정 실 패 ');
  		}
  	});
  	conn.release();
  });
});


// 8. 삭제
router.post('/delete', function(req, res, next) {
 	var num = req.body.num;
  var pwd = req.body.pwd;

  pool.getConnection(function(err, conn){
  	if(err) console.error('err = ' , err);

  	var sql = "delete from board where num=? and pwd=?";
  	var arr = [num, pwd];
  	conn.query(sql, arr, function(err, row ){
  		if(err) console.error('err ' , err);

  		if(row.affectedRows == 1) {
  			res.redirect('/list');
  		}	else {
  			//res.send('삭  제  실 패 ');
  			res.send('<script>alert("비밀번호가 틀려서 되돌아갑니다.");history.back();</script>');
  		}
  	});
  	conn.release();
  });
});

module.exports = router;
