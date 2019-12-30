let models = require('../../db');
let express = require('express');
let router = express.Router();
let mysql = require('mysql');
let conn = mysql.createConnection(models.mysql);
conn.connect();
let jsonWrite = function(res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code: '1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};


/** movie_name */

//查询收藏歌曲的所有用户
router.post('/query', (req, res) => {
	let sql = 'select * from movie_user where movie_name= ?';
	conn.query(sql, req.body.movie_name , function(err, result) {
		if (err) {
			console.log(err);
		}
		if(result) {
			jsonWrite(res, result)
		}
	})
})

//插入收藏歌名和用户名
router.post('/love_user', (req, res) => {
	let sql = 'insert into movie_user(movie_name, user_name) values (?, ?)';
	let params = [req.body.movie_name, req.body.user_name];
	conn.query(sql, params, function(err, result) {
		if (err) {
			console.log(err);
		}
		if(result) {
			jsonWrite(res, result)
		}
	})
})

//查询用户收藏的歌曲
router.post('/queryUser', (req, res) => {
	let sql = 'select * from movie_user where user_name= ?';
	conn.query(sql, req.body.user_name , function(err, result) {
		if (err) {
			console.log(err);
		}
		if(result) {
			jsonWrite(res, result)
		}
	})
})

//删除用户收藏的歌曲
router.post('/deteleUser', (req, res) => {
	let sql = 'delete from movie_user where user_name= ? and movie_name= ?';
	conn.query(sql, [req.body.user_name, req.body.movie_name] , function(err, result) {
		if (err) {
			console.log(err);
		}
		if(result) {
			jsonWrite(res, result)
		}
	})
})

/** movie_count */

//插入收藏歌名和数量
router.post('/love_count', (req, res) => {
	let sql = 'insert into movie_count(movie_name, count) values (?, ?)';
	let params = [req.body.movie_name, req.body.count];
	conn.query(sql, params, function(err, result) {
		if (err) {
			console.log(err);
		}
		if(result) {
			jsonWrite(res, result)
		}
	})
})

//更新收藏歌名和数量
router.post('/updata_count', (req, res) => {
	let sql = 'update movie_count set count = ? where movie_name = ? ';
	let params = [req.body.count, req.body.movie_name];
	conn.query(sql,params, function(err, result) {
		if (err) {
			console.log(err);
		}
		if(result) {
			jsonWrite(res, result)
		}
	})
})

//查询歌曲收藏数量
router.post('/query_count', (req, res) => {
	let sql = 'select count from movie_count where movie_name= ?';
	conn.query(sql, req.body.movie_name , function(err, result) {
		if (err) {
			console.log(err);
		}
		if(result) {
			jsonWrite(res, result)
		}
	})
})

//查询热门歌曲
router.get('/query_hot', (req, res) => {
	let sql = 'select movie_name from movie_count ORDER BY count desc limit 0,10';
	conn.query(sql, function(err, result) {
		if (err) {
			console.log(err);
		}
		if(result) {
			jsonWrite(res, result)
		}
	})
})

//删除用户收藏的歌曲
router.post('/detele_movie', (req, res) => {
	let sql = 'delete from movie_count where movie_name= ?';
	conn.query(sql, req.body.movie_name , function(err, result) {
		if (err) {
			console.log(err);
		}
		if(result) {
			jsonWrite(res, result)
		}
	})
})

module.exports = router;