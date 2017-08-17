var express = require('express');
var mysql=require('mysql');
var router = express.Router();

var pool = mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'hyj321321hyj',
	database:'kamang',
	port:3306,
	connectionLimit:600 //最多允许600个人同时访问
});


router.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

function getUserByName(sql,arrs,callback){
	pool.getConnection(function(err,connection){
		connection.query(sql,arrs,function(err,result){
			if(err){
				console.log("ERRor:"+err.message);
				return;
			}
			connection.release(); //断开数据池
			callback(err,result);
		})
	})
}

/* GET users listing. */
router.get('/users', function(req, res, next) {
  // var sql='select * from xinxi';
  var sql='select * from xinxi order by credit desc limit 20';
  getUserByName(sql,[],function(a,b){
  	res.send(b);
  })
});

module.exports = router;
