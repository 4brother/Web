var express = require('express');
var router = express.Router();
let db = require('../model/db');
/* GET home page. */
router.get('/home', function(req, res, next) {
  let page=req.query.page?req.query.page:1;
  let size=10;
  let start = (page-1)*10;
  let sql = `SELECT *,(SELECT COUNT(*) FROM user) AS count FROM user LIMIT ${start},${size}`;
  console.log(sql);
  let connection = db.connection();
  db.query(connection,sql,function(result){
    console.log(result)
    //title:标题 userList:用户列表 pages:总页数 page:当前页数 startPage页面显示部分页数的开始 endPage页数显示部分页数的结束（例如显示15~20页，30~40页）
    res.render('index', { title: 'home',userList: result,pages: Math.ceil(result[0].count/10),page:page ,startPage: page-10>0?page-3:page,endPage: Number(page)+9<Math.ceil(result[0].count/10)?Number(page)+6:Math.ceil(result[0].count/10)});
  })
  db.close(connection);
});
router.get('/news', function(req,res,nex){
  res.render('news', {title: 'news'})
});
router.get('/form', function(req, res, next){
  res.render('form', {title: 'form'})
})
module.exports = router;
