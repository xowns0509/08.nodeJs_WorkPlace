
/**
 * Module dependencies.
 */

var express = require('express')// 사용하고자 하는 특정 모듈명을 쓰거나
  //, routes = require('./routes')// 사용하고자 하는 모듈이 들어있는 경로를 require한다.
  //, user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
// ||는 or이므로, 어떤 설정값이 들어오지 않으면 포트는 기본값으로 3000으로 하겠다.
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');// 뷰엔진. default를 jade로 잡음.
//express의 기본이 jade걸랑.
app.use(express.favicon());//파비콘은 작은 이미지를 칭함.
app.use(express.logger('dev'));
app.use(express.bodyParser());//xml 따위를 분석하는 놈.
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));//퍼블릭은
// 스타일시트나 자바스크립트 등을 기술하는 폴더를 public이라.

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);//여기서 routes폴더의 index.js를 부르는 거.
//app.get('/users', user.list);

//위에 꺼 대신에 아래 껄로 컨트롤러 단을 부르는 거야. 그 안에 index를 사용하기로 했으니.
//var controllers = require('./controllers');
//app.get('/', controllers.index); //controllers 폴더의 index.js

//이제 route를 거쳐가게 하기 위해 위는 주석처리 후 아래를 새로기술.
require('./routes').route(app);
require('./db').connect();

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
